import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { finalize} from 'rxjs/operators';

import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { tap} from 'rxjs/operators';

import { MaterialModule } from '../MaterialModule';
import { ProgressComponent } from '../progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { CommonModule } from '@angular/common';
import { DndDirective } from '../loaddnd/dnd.directive';



@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, DndDirective, ProgressComponent, MatDialogModule, ReactiveFormsModule, FormsModule ],
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit {

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
