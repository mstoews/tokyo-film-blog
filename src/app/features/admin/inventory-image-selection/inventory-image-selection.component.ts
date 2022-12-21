import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from 'app/features/ui/advanced-search/advanced-search.module';

@Component({
  selector: 'image-selection',
  templateUrl: './inventory-image-selection.component.html',
  styleUrls: ['./inventory-image-selection.component.css'],
})
export class InventoryImageSelectionComponent implements OnInit, OnDestroy {
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

  constructor(
    public imageListService: ImageListService,
    private fb: FormBuilder
  ) {}

  Refresh() {
    this.subNotUsed = this.imageListService
      .getImagesByType(this.IN_NOT_USED)
      .subscribe((item) => {
        this.not_usedImages = item;
      });
    this.subFeatured = this.imageListService
      .getImagesByType(this.IN_FEATURED)
      .subscribe((item) => {
        this.featuredImages = item;
      });
    this.subCollections = this.imageListService
      .getImagesByType(this.IN_COLLECTION)
      .subscribe((item) => {
        this.collectionsImages = item
      })
    this.verifyArray()
  }

  verifyArray()
  {
    console.log(`Not used images: ${this.not_usedImages.length}`)
    console.log(`Featured images: ${this.featuredImages.length}`)
    console.log(`Main images: ${this.mainImages.length}`)
  }

  ngOnInit() {
    // this.imageListService.createImageList()
    this.Refresh();
  }

  Clone() {
    throw new Error('Method not implemented.');
  }

  Add() {}

  Delete() {
    throw new Error('Method not implemented.');
  }

  backToShop() {}

  closeDrawer() {
    throw new Error('Method not implemented.');
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
        event.container.id
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
    newContainerId: string
  ) {
    const cnt = newData.length;
    if (cnt > 0) {
      let i = 1;
      newData.forEach((image: any) => {
        image.ranking = i;
        image.type = newContainerId;
        this.imageListService.update(image, image.id);
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
