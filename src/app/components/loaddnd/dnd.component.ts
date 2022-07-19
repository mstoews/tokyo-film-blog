import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import { EMPTY, Observable, Subscription, throwError } from 'rxjs';
import { MaterialModule } from '../../MaterialModule';
import { ProgressComponent } from '../progress/progress.component';
import { DndDirective } from './dnd.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUrl} from '../models/imageUrl.model'
// import { persistenceEnabled as _persistenceEnabled } from '../../app.module';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots
} from '@angular/fire/firestore';

import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

const options = {
  ignoreAttributes: true,
  removeNSPrefix: true,
  htmlEntities: true,
};

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, ProgressComponent, DndDirective, MatDialogModule, ReactiveFormsModule, FormsModule ],
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss'],
})
export class DndComponent {
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DndComponent>,
    private storage: AngularFireStorage,
    private afs: Firestore,
    private auth: Auth,
  ) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
    this.createForm();
  }
  @ViewChild('fileDropRef', { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];
  upLoadFiles: File[] = [];
  formGroup!: UntypedFormGroup;
  fileData: any;
  VERSION_NO = 1;
  previewUrl!: string;
  public url!: string | null;
  public testDocValue$: Observable<any> | undefined;
  public user: Observable<User | null> = EMPTY;
  private userDisposable: Subscription|undefined;
  showLoginButton = false;
  showLogoutButton = false;

  map: any;

  createForm() {
    this.formGroup = this.fb.group({});
  }

  onFileDropped($event: any) {
    console.log($event);
    this.prepareFilesList($event);
  }

  fileBrowseHandler($event: any) {
    this.prepareFilesList($event.target.files);
  }

  prepareFilesList(files: any) {

    for (const item of files) {
      console.log(`file list: ${item.name}`);
      this.upLoadFiles.push(item);
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log ('delete files ');
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFileProgress(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
           if (this.files[index].progress === 100) {
             clearInterval(progressInterval);
             this.uploadFileProgress(index + 1);
           } else {
           this.files[index].progress += 5;
          }
        }, 4);
      }
    }, 10);
  }
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 4);
      }
    }, 10);
  }

  startUpload(file: File) {

    // The storage path
    const path = `uploaded/${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    const task = this.storage.upload(path, file, {
      cacheControl: 'max-age=2592000, public'
    });

    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(path).getDownloadURL()),
                tap(url => this.url = url),
                catchError(err => {
                    console.log(err);
                    alert('Could not create thumbnail url.');
                    return throwError(err);
                })

            ).subscribe();

      const image: ImageUrl = {
          url: this.url,
          name: file.name,
          version_no: this.VERSION_NO
      }
      const data = doc(this.afs, 'files' + image);
      // doc(collection(this.afs,'files').add(image);
      this.testDocValue$ = docData(data).pipe(
        traceUntilFirst('firestore')
      );
  }
  onCreate() {
    for (const item of this.upLoadFiles) {
      console.log(item);
      this.startUpload(item);
    }
    this.dialogRef.close({ event: 'Cancel' });
  }


  processImageFile(fileString: string, file: File) {

    const filePath = `uploaded/${fileString}`;
    const task = this.storage.upload(fileString, file, {
        cacheControl: 'max-age=2592000, public'
    });

    task.snapshotChanges()
        .pipe(
            last(),
            concatMap(() => this.storage.ref(filePath).getDownloadURL()),
            tap(url => this.previewUrl = url),
            catchError(err => {
                console.log(err);
                alert('Could not create thumbnail url.');
                return throwError(err);
            })

        )
        .subscribe();
  }

  processUploadFile(file: string) {
    if (this.auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
        this.storage.upload(file, file, {
          cacheControl: 'max-age=2592000, public'
        });
      });
    }
  }


  updateProgress(evt: any) {
    if (evt.lengthComputable) {
      // evt.loaded and evt.total are ProgressEvent properties
      const loaded = evt.loaded / evt.total;
      if (loaded < 1) {
        this.uploadFilesSimulator(loaded);
      }
    }
  }

  async processFileDataFromJson(filedata: any) {
    console.log('Process a file');
    const data = JSON.parse(filedata);
    // for (const element of data) {
    //   this.partyService.createdatabase(element);
    // }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
