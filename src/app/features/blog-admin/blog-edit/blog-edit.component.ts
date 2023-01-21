import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'app/models/blog';
import { BlogService } from 'app/services/blog.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit{
  cRAG: any;
  sTitle: any;
  blogGroup: any;
  //blogImages$: any;

  sub: any;
  blogId: string;
  para: string;
  body: string;
  conclusion: string;

  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;

  blog!: Blog;


  constructor(
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private _location: Location,
    private blogService:  BlogService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string) { }

  ngOnInit(): void {
      var id: string;
      this.blog = this.activateRoute.snapshot.data["blog"];
      //this.blogImages$ = this.blogService.getBlogImage(this.blog.id);

      if (this.blog) {
        this.blogId = this. blog.id
        this.para = this.blog.paragraph;
        this.body = this.blog.body;
        this.conclusion = this.blog.conclusion;
        this.createForm(this.blog);
        }
  }

  onUpdate(data: Blog) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    data = this.blogGroup.getRawValue();
    data.paragraph = this.para;
    data.body = this.body;
    data.conclusion = this.conclusion;
    data.date_updated = updateDate;
    this.blogService.update(data);
  }


  onCreate(data: any) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    const newBlog = { ...this.blogGroup.value } as Blog;
    newBlog.date_updated = updateDate;
    newBlog.date_created = updateDate;
    this.blogService.create(newBlog);
  }

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  onBackToBlog() {
    this._location.back();
  }

  onDelete(data: Blog) {
    data = this.blogGroup.getRawValue();
    this.blogService.delete(data.id.toString());
  }

  closeDialog() {  }


  createForm(blog: Blog) {
    this.sTitle = 'Blog - ' + blog.title;
    this.blogGroup = this.fb.group({
      id: [blog.id],
      title: [blog.title],
      paragraph: [blog.paragraph],
      body: [blog.body],
      conclusion: [blog.conclusion],
      user_updated: [blog.user_updated],
      date_created: [blog.date_created],
      date_updated: [blog.date_updated],
    });
  }

  onImages() {
    const parentId = this.blogGroup.getRawValue();
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: {
        parent: parentId.id,
        location: 'blog',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
  }

  create(data: any) {
    const rawData = this.blogGroup.getRawValue();
    this.blogService.update(rawData);
    this.afs.collection('blog').doc(rawData.id).collection('images').add(data);
  }

  createEmptyForm() {
    this.blogGroup = this.fb.group({
      id: [''],
      title: [''],
      paragraph: [''],
      body: [''],
      conclusion: [''],
      user_updated: [''],
      date_created: [''],
      date_updated: [''],
    });
  }

}
