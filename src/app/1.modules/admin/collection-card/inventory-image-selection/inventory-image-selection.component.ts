import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from 'app/1.modules/ui/advanced-search/advanced-search.module';
import { IImageStorage } from 'app/5.models/maintenance';
import { ProductsService } from 'app/4.services/products.service';

@Component({
  selector: 'image-selection',
  templateUrl: './inventory-image-selection.component.html',
  styleUrls: ['./inventory-image-selection.component.css'],
})
export class InventoryImageSelectionComponent implements OnInit, OnDestroy {
  @Input() productId: string;

  currentImage: imageItem;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_FEATURED = 'IN_INVENTORY';
  IN_MAIN = 'IN_MAIN';
  IN_COLLECTION = 'IN_COLLECTION';

  subNotUsed: Subscription;
  subFeatured: Subscription;
  subMain: Subscription;
  subCollections: Subscription;

  not_usedImages: imageItem[] = [];
  featuredImages: imageItem[] = [];
  collectionsImages: imageItem[] = [];
  mainImages: imageItem[] = [];
  inventoryImages$: Observable<imageItem[]>;

  constructor(
    public imageListService: ImageListService,
    public productService: ProductsService,
    private fb: FormBuilder
  ) {}

  Refresh() {
    this.imageListService.createRawImagesList();

    if (this.productId) {
      this.inventoryImages$ = this.productService.getProductImage(
        this.productId
      );
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
        this.collectionsImages = item;
      });
    // this.verifyArray()
  }

  verifyArray() {
    //console.debug(`Not used images: ${this.not_usedImages.length}`)
    //console.debug(`Featured images: ${this.featuredImages.length}`)
    //console.debug(`Main images: ${this.collectionsImages.length}`)
  }

  ngOnInit() {
    // convert images to format of imageList
    this.Refresh();
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
        image.parentIdma = this.productId;
        this.imageListService.updateImageList(image);
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
    // debug('Updatedate Image Type', JSON.stringify(newData));
    const cnt = newData.length;
    if (cnt > 0) {
      let i = 1;
      newData.forEach((image: imageItem) => {
        image.ranking = i;
        image.parentId = this.productId;
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
