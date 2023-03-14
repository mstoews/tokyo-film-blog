import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comments } from '../../../models/comments'


@Component({
  selector: 'blog-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {

  commentGroup: FormGroup;
  blog_id: string;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private fb: FormBuilder,

  ) {

  }

  onSubmit() {

  }

  createForm() {
    this.commentGroup = this.fb.group({
      message: ['', 
       [Validators.required,
       Validators.minLength(20),
       Validators.maxLength(300)]]}
    );
  }

}
