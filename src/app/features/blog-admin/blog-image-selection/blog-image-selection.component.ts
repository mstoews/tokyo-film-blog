import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from 'app/features/ui/advanced-search/advanced-search.module';
import { IImageStorage } from 'app/models/maintenance';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'blog-image-selection',
  templateUrl: './blog-image-selection.component.html',
  styleUrls: ['./blog-image-selection.component.css'],
})
export class BlogImageSelectionComponent implements OnInit, OnDestroy {
  @Input() productId: string;
  onUpdate: any;
  cRAG: any;
  sTitle: any;
  currentImage: imageItem;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_FEATURED = 'IN_INVENTORY';
  IN_MAIN = 'IN_MAIN';
  IN_COLLECTION = 'IN_COLLECTION';

  subNotUsed: Subscription;
  subFeatured: Subscription;
  subMain: Subscription;
  subCollections: Subscription

  not_usedImages: imageItem[] = [];
  featuredImages: imageItem[] = [];
  collectionsImages: imageItem[] = [];
  mainImages:     imageItem[] = [];
  inventoryImages$: Observable<imageItem[]>;

  constructor(
    public imageListService: ImageListService,
    public productService: ProductsService,
    private fb: FormBuilder
  ) {}

  Refresh() {

    // this.imageListService.createRawImagesList();

    if(this.productId){
      this.inventoryImages$ = this.productService.getProductImage(this.productId);
    }

    this.subNotUsed = this.imageListService
      .getImagesByType(this.IN_NOT_USED)
      .subscribe((item) => {
        this.not_usedImages = item;
      });

    this.subFeatured = this.imageListService
      .getImagesByType(this.productId)
      .subscribe((item) => {
        this.featuredImages = item;
      });

      // this.subFeatured = this.productService.getProductImage(this.productId).subscribe

      this.subCollections = this.imageListService
      .getImagesByType(this.productId)
      .subscribe((item) => {
        this.collectionsImages = item
      })
    // this.verifyArray()
  }

  verifyArray()
  {
    console.log(`Not used images: ${this.not_usedImages.length}`)
    console.log(`Featured images: ${this.featuredImages.length}`)
    console.log(`Main images: ${this.collectionsImages.length}`)
  }

  ngOnInit() {
    // convert images to format of imageList
    this.Refresh();
  }


  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onCreate(arg0: any) {
    throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<imageItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateRanking(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateImageType(
        event.previousContainer.data,
        event.container.data,
        event.container.id,
        event.currentIndex
      );
    }
  }

  private updateRanking(previousData: any[]) {
    const cnt = previousData.length;
    if (cnt > 0) {
      let i = 1;
      previousData.forEach((image) => {
        image.ranking = i;
        this.imageListService.update(image, image.id);
        i++;
      });
    }
  }

  private updateImageType(
    previousData: any,
    newData: any,
    newContainerId: string,
    currentIndex: number
  ) {
    const cnt = newData.length;
    if (cnt > 0) {
      let i = 1;
      newData.forEach((image: any) => {
        image.ranking = i;
        image.type = newContainerId;
        this.imageListService.updateImageList(image);
        i++;
      });

    }
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subFeatured.unsubscribe();
    this.subCollections.unsubscribe();
  }
}
