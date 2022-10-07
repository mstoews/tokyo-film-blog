import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { IBlog } from 'app/interfaces/mt-Blog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'blog-list',
  template: `
   <mat-drawer-container>
   <mat-drawer #drawer [opened]="false" mode="side" [position]="'end'" [disableClose]="false">
   <mat-card class="text-base bg-gray-100">
   <div mat-dialog-title [ngStyle]="{'border-left': '10px solid' + cRAG  }">{{sTitle}}</div>
<div mat-dialog-content>
    <form [formGroup]="blogGroup" (ngSubmit)="onUpdate(blogGroup.value)" class="form">

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Title" formControlName="title" />
        </mat-form-field>


        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Image List" formControlName="images" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="User" formControlName="user_updated" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="Created Date" type="date" id="date_created" formControlName="date_created" />
        </mat-form-field>

        <mat-form-field  class="form-element m-1" [ngStyle]="{ width: '48%' }" >
            <input matInput placeholder="Updated Date" type="date" id="date_updated" formControlName="date_updated" />
        </mat-form-field>

        <mat-form-field class="mat-form-field" [ngStyle]="{ width: '100%' }">
                <textarea matInput placeholder="Summary" formControlName="paragraph" [ngStyle]="{ height: '6em' }">
                </textarea>
        </mat-form-field>

    </form>
</div>
<div mat-dialog-actions>
    <button mat-button (click)="onUpdate(blog)" mat-flat-button color="primary" [disabled]="!blogGroup.valid">
        Update
    </button>
    <button mat-button (click)="onCreate()" mat-flat-button color="primary" [disabled]="!blogGroup.valid">
        Insert
    </button>
    <button mat-button (click)="onDelete(blog)" mat-flat-button color="primary" [disabled]="!blogGroup.valid">
        Delete
    </button>
    <button mat-button (click)="closeDialog()" mat-flat-button color="warn">
        Close
    </button>
</div>
<div mat-dialog-actions>
    <mat-radio-group [(ngModel)]="drawOpen">
        <mat-radio-button class="example-margin" value="open">Remain Open</mat-radio-button>
        <mat-radio-button class="example-margin" value="close">Close on Complete</mat-radio-button>
    </mat-radio-group>
</div>
   </mat-card>
   </mat-drawer>
    <ng-container *ngIf="allBlogs$ | async as rows">
    <grid-menubar [inTitle]="sTitle"
    (notifyParentRefresh)="Refresh()"
    (notifyParentDelete)="Delete()"
    (notifyParentAdd)="Add()"
    (notifyParentClone)="Clone()"

    >

    </grid-menubar>
      <grid
        [cols]="cols"
        [rows]="rows"
        (notifyOpenDialog)="onNotify($event)"
      >
      </grid>
    </ng-container>
    <mat-drawer-container>
  `,
    styleUrls: ['./blog-grid.component.css'],
})

export class BlogGridComponent implements OnInit  {
    @ViewChild('drawer') drawer: MatDrawer;
    drawOpen: 'open' | 'close' = 'open';
    blogGroup: FormGroup;
    action: string;
    party: string;
    sTitle: string;
    cPriority: string;
    cRAG: string;
    cType: string;
    currentDate: Date;
    blog: any;

    blogId: string;

    allBlogs$: Observable<IBlog[]>;

    constructor(
      private readonly blogService: BlogService,
      private fb: FormBuilder,
      private afs: AngularFirestore)   {
      this.blog = this.blogType;
      this.createEmptyForm();
      }

    ngOnInit() {
      this.Refresh();
    }

    openDrawer() {
      const opened = this.drawer.opened;
      if (opened !== true) {
        this.drawer.toggle();
      } else {
        return;
        }
      }

    closeDrawer() {
      const opened = this.drawer.opened;
      if (opened === true) {
        this.drawer.toggle();
      } else {
        return;
        }
      }

    Add() {
      console.log('open drawer to add ... ');
      this.openDrawer();
    }

    Delete() {
      console.log('open drawer to delete ... ');
      this.openDrawer();
    }

    Clone() {
      console.log('open drawer to clone ... ');
      this.openDrawer();
    }

    Refresh() {
      this.sTitle = 'Blog Lists'
      this.blogId = this.afs.createId();
      this.allBlogs$ = this.blogService.getAll();
    }

    onCreate() {
        const newBlog = { ...this.blogGroup.value} as IBlog;
        console.log(`onCreate ${newBlog}`);
        this.blogService.create(newBlog);
    }

    onNotify(event: any) {
      console.log(event);
      this.blog = event;
      this.createForm(this.blog);
      this.toggleDrawer();
    }

    toggleDrawer() {
      const opened = this.drawer.opened;
      if (opened !== true) {
        this.drawer.toggle();
      } else {
        if (this.drawOpen === 'close') {
          this.drawer.toggle();
        }
      }
    }

  dateFormatter(params: any) {
      const dateAsString = params.value;
      const dateParts = dateAsString.split('-');
      return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
    }

  onUpdate(data: IBlog) {
      data = this.blogGroup.getRawValue();
      console.log(`onUpdate: ${JSON.stringify(data)}`);
      this.blogService.update(data);

  }

  onDelete(data: IBlog) {
      data = this.blogGroup.getRawValue();
      console.log(`onDelete: ${data}`);
      this.blogService.delete(data.id.toString());
  }

  closeDialog() {
    this.drawer.toggle();
  }

  public blogType = {
    id: '',
    title: '',
    paragraph: '',
    images: '',
    user_updated: '',
    date_created: '',
    date_updated: ''
  }

  createEmptyForm() {
    this.blogGroup = this.fb.group({
      id: [''],
      title: [''],
      paragraph: [''],
      images: [''],
      user_updated: [''],
      date_created: [''],
      date_updated: ['']
    });
  }

createForm(blog: IBlog) {
    this.sTitle = 'Blog - ' + blog.title;

    const dDate = new Date(blog.date_updated);
    const dueDate = dDate.toISOString().split('T')[0];

    const sDate = new Date(blog.date_created);
    const startDate = sDate.toISOString().split('T')[0];

    this.blogGroup = this.fb.group({
      id: [blog.id],
      title: [blog.title],
      paragraph: [blog.paragraph],
      images: [blog.images],
      user_updated: [blog.user_updated],
      date_created: [blog.date_created],
      date_updated: [blog.date_updated]
    });
  }

  cols = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'Paragraph', field: 'paragraph'},
    { headerName: 'Images', field: 'images' },
    { headerName: 'Date Created', field: 'date_created' },
    { headerName: 'Date Updated', field: 'date_updated' },
  ];
}
