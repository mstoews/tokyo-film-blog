import { Component, ElementRef, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Blog } from 'app/models/blog';
import { MatDrawer } from '@angular/material/sidenav';
import { TextEditorComponent } from '../text-editor/text-editor.component'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TextService } from '../text-editor/text.service';
import { Item } from 'app/models/item'

@Component({
  selector: 'blog-list',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
  providers: [TextService]
})
export class BlogGridComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;


  drawOpen: 'open' | 'close' = 'open';
  blogGroup: FormGroup;
  sTitle: string;
  cRAG: string;
  currentDate: Date;

  collapsed = false;
  current_Url: string;
  blogId: string;
  data: Item[] = []
  @Input() para: string;
  @Input() body: string;
  @Input() conclusion: string;

  // Lightbox setup
  private _subscription: Subscription;

  // blog dictionary
  allBlogs$: Observable<Blog[]>;
  blog: Blog;

  selectedItemKeys: any;

  constructor(
    private matDialog: MatDialog,
    private auth: AngularFireAuth,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
    private blogService: BlogService,
    private fb: FormBuilder,
    private textService: TextService
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
    this.current_Url = data.images[0].thumbImage;
    this.blogService.update(rawData);
  }

  onUpdate(data: Blog) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    data = this.blogGroup.getRawValue();
    data.paragraph = this.para;
    data.body = this.body;
    data.conclusion = this.conclusion;
    data.date_updated = updateDate;
    console.log(`onUpdate: ${JSON.stringify(data)}`);
    this.blogService.update(data);
  }

  onCellDoublClicked(e: any) {
    console.log(`onCellDoubleClicked: ${JSON.stringify(e.body)}`);
    this.data = [];
    var counter = 0
    this.para = e.data.paragraph;
    this.conclusion = e.data.conclusion;
    this.body = e.data.body;
    this.current_Url = e.data.images[0].image;
    if (e.data.images.length > 0){
      e.data.images.forEach((img: any) => {
      counter++;
         var Image = {
           imageSrc: img.image,
           imageAlt: counter.toString(),
           }
           this.data.push(Image);
         });
      }
    this.blogGroup.setValue(e.data);
    this.openDrawer();
  }

  onNotify(event: any) {
    this.blogGroup.setValue(event.data);
    this.current_Url = event.data.images;
    this.toggleDrawer();
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
    this.sTitle = 'Blog Lists';
    // this.blogId = this.afs.createId();
    this.createEmptyForm();
    this.allBlogs$ = this.blogService.getAll();
  }

  onCreate() {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    const newBlog = { ...this.blogGroup.value } as Blog;
    newBlog.date_updated = updateDate;
    newBlog.date_created = updateDate;
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

  valueChangedEvent(e: any){
      console.log(`blog grid value changed ${e}`)
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
      date_updated: [''],
    });
  }

  createForm(blog: Blog) {
    this.sTitle = 'Blog - ' + blog.title;
    this.blogGroup = this.fb.group({
      id: [blog.id],
      title: [blog.title],
      images: [blog.images],
      paragraph: [blog.paragraph],
      body: [blog.body],
      conclusion: [blog.conclusion],
      user_updated: [blog.user_updated],
      date_created: [blog.date_created],
      date_updated: [blog.date_updated],
    });
  }

}
