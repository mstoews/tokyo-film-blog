import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'app/models/products';
import { Blog } from 'app/models/blog';
import { Collection } from 'app/models/collection';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IImageStorage } from 'app/models/maintenance/mt-ImageMaintenance';
import { MatDrawer } from '@angular/material/sidenav';
import { BlogService } from 'app/services/blog.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'image-maintenance',
  templateUrl: './image-maintenance.component.html',
  styleUrls: ['./image-maintenance.component.css'],
})
export class ImageMaintenanceComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  public imageData!: IImageStorage;
  openTasks: any;
  priorities: any;
  task: any;
  imageGroup: FormGroup;
  onUpdate: any;
  cRAG: any;
  sTitle: any;

  public IMAGES = 'Images';
  public BLOGS = 'Blogs';
  public COLLECTIONS = 'Collections';
  public PRODUCTS = 'Products';

  selected: string;

  subInventoryImages: Subscription;
  subBlogs: Subscription;
  subCollections: Subscription;
  subProducts: Subscription;

  inventoryImages: IImageStorage[] = [];
  blogs: Blog[] = [];
  products: Product[];
  collections: Collection[];

  constructor(
    public productService: ProductsService,
    public storage: AngularFireStorage,
    public blogService: BlogService) {
    this.Refresh();
  }

  Refresh() {
    this.BlogList()
    this.ImagesList();
  }

  ProductList() {
    var productItems: Observable<Product[]>;
    productItems = this.productService.getAll();

    productItems.subscribe((products) => {
      products.forEach ((res) => {
        this.products.push(res);
        console.log(res.description);
      })
    })
  }

  ImagesList() {
    this.storage
      .ref('/thumbnails')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: IImageStorage = {
              url: imageUrl,
              parentId: '',
              name: imageRef.name,
              version_no: 1,
            };
            this.inventoryImages.push(imageData);
          });
        });
      });
  }

  BlogList() {
    var blogItems: Observable<Blog[]>;
    blogItems = this.blogService.getAll();

    blogItems.subscribe((blog) => {
      blog.forEach ((res) => {
        this.blogs.push(res);
        console.log(res.title);
      })
    })
  }



  ngOnInit(): void {

  }

  Clone() {
    throw new Error('Method not implemented.');
  }
  Add() {
    console.log('toggle drawer');
    this.toggleDrawer();
  }
  Delete() {
    throw new Error('Method not implemented.');
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

  closeDrawer() {
    throw new Error('Method not implemented.');
  }

  changePriority(arg0: any) {
    throw new Error('Method not implemented.');
  }
  changeType(arg0: any) {
    throw new Error('Method not implemented.');
  }
  changeRag(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onCreate(arg0: any) {
    throw new Error('Method not implemented.');
  }

  drop($event: CdkDragDrop<any, any, any>) {

  }
}
