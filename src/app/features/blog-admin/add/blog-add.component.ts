import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Category } from 'app/models/category';
import { Blog } from 'app/models/blog';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
})
export class BlogAddDialog {
  title: string;
  form = this.fb.group({
     title: [this.blog.title, Validators.required],
     releasedAt: [new Date(), Validators.required],
  });

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private blog: Blog ,
              private afs : AngularFireStorage,
              private dialogRef: MatDialogRef<BlogAddDialog>) {

      this.title = blog.title;

  }

  ngOnInit() {

  }

  save() {

  }

  close() {

      this.dialogRef.close();

  }

}

export function openBlogAddDialog(dialog: MatDialog, blog: Blog) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";
  config.width = "400px"

  config.data = {
      ...blog
  };

  const dialogRef = dialog.open(BlogAddDialog, config);

  return dialogRef.afterClosed();
}

