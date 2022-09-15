import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { finalize} from 'rxjs/operators';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { tap} from 'rxjs/operators';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { CommonModule } from '@angular/common';
import { DndDirective } from '../../loaddnd/dnd.directive';



@Component({
  standalone: true,
  imports: [CommonModule, DndDirective, MatDialogModule, ReactiveFormsModule, FormsModule ],
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file!: File;
  task!: AngularFireUploadTask;

  percentage: any;
  snapshot: Observable<firebase.storage.UploadTaskSnapshot> | undefined;
  downloadURL!: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    this.percentage = of(0);
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
       await ref.getDownloadURL().subscribe(url => {
         this.db.collection('files').add( { downloadURL: url, path });
        });
      }),
    );
  }

  isActive(snapshot: firebase.storage.UploadTaskSnapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
