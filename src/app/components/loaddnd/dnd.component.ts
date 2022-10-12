import { Component, ViewChild, ElementRef, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { EMPTY, Observable, Subscription, throwError } from 'rxjs';
import { MaterialModule } from '../../MaterialModule';
import { ProgressComponent } from '../progress/progress.component';
import { DndDirective } from './dnd.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IImageStorage} from 'app/interfaces/mt-ImageMaintenance'
import { AuthService } from 'app/services/auth/auth.service';
import { ImageMaintenanceService } from 'app/modules/maintenance/image-maintenance.service';


const options = {
  ignoreAttributes: true,
  removeNSPrefix: true,
  htmlEntities: true,
};

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, ProgressComponent, DndDirective, MatDialogModule, ReactiveFormsModule, FormsModule ],
  selector: 'image-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss'],
})
export class DndComponent {
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DndComponent>,
    public imageMaintenanceService: ImageMaintenanceService,
    public storage: AngularFireStorage,
    public afs: AngularFirestore,
    private auth: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentImage: any ) {
    this.createForm();
  }

  @ViewChild('fileDropRef', { static: false })
  downloadUrl: Observable<string | null>;

  files: any[] = [];
  upLoadFiles: File[] = [];
  formGroup!: UntypedFormGroup;
  fileData: any;
  VERSION_NO = 1;
  percentageChange$: Observable<number|undefined>;
  public imageData!: IImageStorage;

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

  async startUpload(file: File) {

    const path = `uploaded/${file.name}`;

    console.log(`File path: ${path}`);

    const fileRef = this.storage.ref(path);

    const task = this.storage.upload(path, file, {
      cacheControl: 'max-age=2592000, public'
    });

    this.percentageChange$ = task.percentageChanges();

    this.downloadUrl = fileRef.getDownloadURL();

    this.downloadUrl.subscribe(dw => {
       this.imageData = {
           url:  dw,
           parentId: this.parentImage,
           name: file.name,
           version_no: this.VERSION_NO
       }
       this.imageMaintenanceService.createImageFirebaseInput(this.imageData);
       let data = this.imageData;
       this.dialogRef.close({ event: 'Create', data});
    })
  }

  onCreate() {
    let data = this.imageData;
    for (const item of this.upLoadFiles) {
      this.startUpload(item);
    }
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
