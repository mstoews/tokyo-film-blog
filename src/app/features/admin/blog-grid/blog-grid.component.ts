import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Blog } from 'app/models/blog';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BlogImages } from 'app/models/blog';

export interface IAlbum {
  imageSrc: string;
  imageAlt: string;
}


interface Item {
  imageSrc: string;
  imageAlt: string;
}


@Component({
  selector: 'blog-list',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
})
export class BlogGridComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  blogGroup: FormGroup;
  sTitle: string;
  cRAG: string;
  currentDate: Date;
  blog: Blog;
  collapsed = false;
  current_Url: string;
  blogId: string;

  // Lightbox setup
  private _subscription: Subscription;

  // blog dictionary
  allBlogs$: Observable<Blog[]>;
  selectedItemKeys: any;

  constructor(
    private matDialog: MatDialog,
    private auth: AngularFireAuth,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
    private blogService: BlogService,
    private fb: FormBuilder
  ){}

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
      data: parentId.id,
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

  create(data: Blog) {
    const rawData = this.blogGroup.getRawValue();
    // rawData.images = data.data.url;
    // rawData.images = this.imgCollection;
    this.current_Url = data.images[0].thumbImage;
    this.blogService.update(rawData);
  }

  onCellDoublClicked(e: any) {
    console.log(`onCellDoubleClicked: ${JSON.stringify(e.data)}`);
    this.current_Url = e.data.images;
    e.images.array.forEach((element: ImageData) => {
      console.log(element);
    });
    this.blogGroup.setValue(e.data);
    this.openDrawer();
  }

  onNotify(event: any) {
    this.blogGroup.setValue(event.data);
    this.current_Url = event.data.images;
    this.toggleDrawer();
  }


  data: Item[] = []

  onFocusedRowChanged(e: any) {

    const rowData = e.row && e.row.data;
    console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`);
    this.current_Url = rowData.images[0].thumbImage;
    this.data = [];
    var counter = 0
    rowData.images.forEach((img: any) => {
        counter++;
        var Image = {
          imageSrc: img.image,
          imageAlt: counter.toString(),

          }
          this.data.push(Image);
        }
    );

    this.blogGroup.setValue(rowData);
    this.openDrawer();
  }

  /**
   *
   * @returns
   * "images":[
        {"image":"https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fgray_sweater_knitted.JPG?alt=media&token=45d4f132-80db-4895-acf0-10832d44a30a",
        "thumbImage":"https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fthumbnails%2Fgray_sweater_knitted_200x200.JPG?alt=media&token=656b0ce0-0f52-4f3e-aaf9-1ecad1553fc6",
        "index":0,
        "title":"Gray Sweater",
        "alt":"Gray Sweater"},
        {"index":1,
        "thumbImage":"https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fthumbnails%2Fgray_and_red_sweater_200x200.JPG?alt=media&token=0eab2522-b628-4611-b759-3559fffbf29c",
        "image":"https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fgray_and_red_sweater.JPG?alt=media&token=918ef104-ce7e-4c2d-bcd4-6de4a7dee148",
        "title":"Red Wool",
        "alt":"Red Wool"}]
   */


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
    this.sTitle = 'Blog Lists';
    // this.blogId = this.afs.createId();
    this.createEmptyForm();
    this.allBlogs$ = this.blogService.getAll();
  }

  onCreate() {
    const newBlog = { ...this.blogGroup.value } as Blog;
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

  onUpdate(data: Blog) {
    data = this.blogGroup.getRawValue();
    // data.images = this.imgCollection;
    console.log(`onUpdate: ${JSON.stringify(data)}`);
    this.blogService.update(data);
  }

  onDelete(data: Blog) {
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
    date_updated: '',
  };

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
      date_updated: [''],
    });
  }

  createForm(blog: Blog) {
    this.sTitle = 'Blog - ' + blog.title;

    this.blogGroup = this.fb.group({
      id: [blog.id],
      title: [blog.title],
      paragraph: [blog.paragraph],
      images: [blog.images],
      body: [blog.body],
      conclusion: [blog.conclusion],
      user_updated: [blog.user_updated],
      date_created: [blog.date_created],
      date_updated: [blog.date_updated],
    });
  }
}
