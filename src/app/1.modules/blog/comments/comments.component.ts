import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/4.services/auth/auth.service';
import { BlogService } from 'app/4.services/blog.service';

import { Comments } from '../../../5.models/blog';

@Component({
  selector: 'blog-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  commentGroup: FormGroup;

  comment: Comments;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createForm();
  }

  @Input() userName: string;
  @Input() blog_id: string;

  ngOnInit() {}

  onSubmit() {
    const data = this.commentGroup.getRawValue();
    const dDate = new Date();
    const updateDate = dDate.toISOString();

    if (this.userName === undefined) {
      this.userName = 'Guest';
    }
    const commentEntry = {
      id: '',
      created_date: updateDate,
      message: data.message,
      name: this.userName,
      blog_id: this.blog_id,
      reply: '',
      reply_date: '',
    };
    this.blogService.createComment(commentEntry);
    this.createForm();
  }

  createForm() {
    this.commentGroup = this.fb.group({
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(300),
        ],
      ],
    });
  }
}
