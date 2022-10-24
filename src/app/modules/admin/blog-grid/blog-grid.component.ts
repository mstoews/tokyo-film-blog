import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { IBlog } from 'app/models/blog/mt-Blog';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'blog-list',
    templateUrl: './blog-grid.component.html',
    styleUrls: ['./blog-grid.component.css'],
})

export class BlogGridComponent implements OnInit  {
    @ViewChild('drawer') drawer: MatDrawer;
    drawOpen: 'open' | 'close' = 'open';
    blogGroup: FormGroup;
    sTitle: string;
    cRAG: string;
    currentDate: Date;
    blog: any;
    collapsed = false;
    current_Url: string;
    blogId: string;
    columns = ['title', 'paragraph' , 'images',  'applied', 'user_updated','date_created',  'date_updated']

    allBlogs$: Observable<IBlog[]>;
    selectedItemKeys: any;

    constructor(
      private matDialog: MatDialog,
      private auth: AngularFireAuth,
      @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
      private  blogService: BlogService,
      private fb: FormBuilder)   {
      this.blog = this.blogType;

      }

    ngOnInit() {
      this.Refresh();
      this.cRAG = '#238823';

    }

    contentReady = (e: any) => {
      if (!this.collapsed) {
        this.collapsed = true;
        e.component.expandRow(['Id']);
      }
    };

    selectionChanged(data: any) {
      console.log(`selectionChanged ${data}`);
      this.selectedItemKeys = data.selectedRowKeys;
    }


  onImages() {
    console.log('onImages');
    const parentId = this.blogGroup.getRawValue();
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: parentId.id
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          console.log(`create Images to save: ${JSON.stringify(result.data)}`);
          this.create(result);
          break;
        case 'Cancel':
          console.log(`Image transfer cancelled`);
          break;
      }
    });
  }

  create(data: any ){
    const rawData = this.blogGroup.getRawValue();
    rawData.images = data.data.url;
    this.current_Url = data.data.url;
    this.blogService.update(rawData);
  }

    onCellDoublClicked(e: any ){
      console.log(`onCellDoubleClicked: ${JSON.stringify(e.data)}`);
      this.current_Url = e.data.images;
      this.blogGroup.setValue(e.data);
      this.openDrawer()
    }

    onCellClicked(e: any) {
      console.log(`onCellClicked: ${JSON.stringify(e.data)}`);
      this.current_Url = e.data.images;
      // this.blogGroup.setValue(e.data);
      this.openDrawer()
    }

    onNotify(event: any) {
      this.blogGroup.setValue(event.data);
      this.current_Url = event.data.images;
      this.toggleDrawer();
    }

    onFocusedRowChanged(e: any){
       const rowData = e.row && e.row.data;
       console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`)
       this.current_Url = rowData.images;
       // this.blogGroup.setValue(rowData);
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
      // this.blogId = this.afs.createId();
      this.createEmptyForm();
      this.allBlogs$ = this.blogService.getAll();
    }

    onCreate() {
        const newBlog = { ...this.blogGroup.value} as IBlog;
        this.blogService.create(newBlog);
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
    body: '',
    conclusion: '',
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
      body: [''],
      conclusion: [''],
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
      body: [blog.body],
      conclusion: [blog.conclusion],
      user_updated: [blog.user_updated],
      date_created: [blog.date_created],
      date_updated: [blog.date_updated]
    });
  }

  imgCollection: Array<object> = [
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fgray_sweater_knitted.JPG?alt=media&token=45d4f132-80db-4895-acf0-10832d44a30a',
      thumbImage: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fthumbnails%2Fgray_sweater_knitted_200x200.JPG?alt=media&token=656b0ce0-0f52-4f3e-aaf9-1ecad1553fc6',
      alt: 'Gray Sweater',
      title: 'Gray Sweater'
    }, {
      image: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fgray_and_red_sweater.JPG?alt=media&token=918ef104-ce7e-4c2d-bcd4-6de4a7dee148',
      thumbImage: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fthumbnails%2Fgray_and_red_sweater_200x200.JPG?alt=media&token=0eab2522-b628-4611-b759-3559fffbf29c',
            title: 'Red Wool',
      alt: 'Red Wool'
    }
  ];
}
