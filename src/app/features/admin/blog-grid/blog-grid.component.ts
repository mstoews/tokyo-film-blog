import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Blog } from 'app/models/blog';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Item } from 'app/models/item';
import { IImageStorage } from 'app/models/maintenance';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

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

  collapsed = false;
  current_Url: string;
  blogId: string;
  data: Item[] = [];
  @Input() para: string;
  @Input() body: string;
  @Input() conclusion: string;

  // Lightbox setup
  private _subscription: Subscription;

  // blog dictionary
  allBlogs$: Observable<Blog[]>;
  blogImages$: Observable<IImageStorage[]>;
  columnsToDisplay: string[] = [
    //'selection',
    'title',
    'paragraph',
    // 'body',
    'conclusion',
  ];

  blog: Blog;

  selectedItemKeys: any;

  selection = new SelectionModel<Blog>();

  onBlogToggle(blog: Blog){

    this.selection.toggle(blog);
    console.log(this.selection.selected);

  }


  constructor(
    private matDialog: MatDialog,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private blogService: BlogService,
    private fb: FormBuilder,
    private route: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string
  ) {}


  onOpenRow(row: any){
    this.route.navigate(['admin/blog', row.id]);
  }

  ngOnInit() {
    this.Refresh();
    this.cRAG = '#238823';
  }

  onAdd() {
    this.createEmptyForm();
    this.openDrawer();
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['Id']);
    }
  };

  selectionChanged(data: any) {
    // console.log(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys;
  }

  onImages() {
    // console.log('onImages');

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
          // console.log(`create Images to save: ${JSON.stringify(result.data)}`);
          this.create(result.data);
          break;
        case 'Cancel':
          // console.log(`Image transfer cancelled`);
          break;
      }
    });
  }

  create(data: any) {
    const rawData = this.blogGroup.getRawValue();
    this.blogService.update(rawData);
    this.afs.collection('blog').doc(rawData.id).collection('images').add(data);
  }

  onUpdate(data: Blog) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    data = this.blogGroup.getRawValue();
    data.paragraph = this.para;
    data.body = this.body;
    data.conclusion = this.conclusion;
    data.date_updated = updateDate;
    // console.log(`onUpdate: ${JSON.stringify(data)}`);
    this.blogService.update(data);
  }

  onCellDoublClicked(e: any) {
    this.data = [];
    var counter = 0;
    this.para = e.paragraph;
    this.conclusion = e.conclusion;
    this.body = e.body;
    const parentId = e.id;

    this.blogImages$ = this.blogService.getBlogImage(parentId);
    this.blogGroup.setValue(e);
    this.openDrawer();
  }

  onNotify(event: any) {
    this.blogGroup.setValue(event.data);
    //this.current_Url = event.data.images;
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
    // console.log('open drawer to add ... ');
    this.openDrawer();
  }

  Delete() {
    // console.log('open drawer to delete ... ');
    this.openDrawer();
  }

  Clone() {
    // console.log('open drawer to clone ... ');
    this.openDrawer();
  }

  Refresh() {
    this.sTitle = 'Blog Lists';
    // this.blogId = this.afs.createId();
    this.createEmptyForm();
    this.allBlogs$ = this.blogService.getAll();
  }

  onCreate(data: any) {
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
    // console.log(`onDelete: ${data}`);
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
    user_updated: '',
    date_created: '',
    date_updated: '',
  };

  valueChangedEvent(e: any) {
    // console.log(`blog grid value changed ${e}`)
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
}
