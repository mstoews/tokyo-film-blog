import { Component } from '@angular/core';
import { ImageListService } from '../../../4.services/image-list.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { imageItem, imageItemIndex } from '../../../5.models/imageItem';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent {
  IN_NOT_USED = 'IN_NOT_USED';
  IN_FEATURED = 'IN_FEATURED';
  IN_COLLECTION = 'IN_COLLECTION';
  IN_CREATION = 'IN_CREATION';
  IN_GALLERY = 'IN_GALLERY';

  subNotUsed: Subscription;
  subFeatured: Subscription;
  subCollections: Subscription;
  subCreations: Subscription;
  subGallery: Subscription;

  not_usedImages: imageItemIndex[] = [];
  featuredImages: imageItemIndex[] = [];
  collectionsImages: imageItemIndex[] = [];
  creationsImages: imageItemIndex[] = [];
  galleryImages: imageItemIndex[] = [];

  constructor(
    public imageItemIndexService: ImageItemIndexService,
    private fb: FormBuilder
  ) {}

  async Refresh() {
    this.subNotUsed = (
      await this.imageItemIndexService.getImageItemByType(this.IN_NOT_USED)
    ).subscribe((item) => {
      this.not_usedImages = item;
    });
    this.subFeatured = (
      await this.imageItemIndexService.getImageItemByType(this.IN_FEATURED)
    ).subscribe((item) => {
      this.featuredImages = item;
    });
    this.subCollections = (
      await this.imageItemIndexService.getImageItemByType(this.IN_COLLECTION)
    ).subscribe((item) => {
      this.collectionsImages = item;
    });
    this.subCreations = (
      await this.imageItemIndexService.getImageItemByType(this.IN_CREATION)
    ).subscribe((item) => {
      this.creationsImages = item;
    });
    this.subGallery = (
      await this.imageItemIndexService.getImageItemByType(this.IN_GALLERY)
    ).subscribe((item) => {
      this.galleryImages = item;
    });
  }

  ngOnInit() {
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
        event.container.id
      );
    }
  }

  private updateRanking(previousData: any[]) {
    // loop through just the previous day
    // previous status is the same so not updated
    const cnt = previousData.length;
    if (cnt > 0) {
      let i = 1;
      previousData.forEach((image) => {
        image.ranking = i;
        this.imageItemIndexService.updateImageList(image);
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
        this.imageItemIndexService.updateImageList(image);
        i++;
      });
    }
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subFeatured.unsubscribe();
    this.subCollections.unsubscribe();
    this.subCreations.unsubscribe();
    this.subGallery.unsubscribe();
  }
}
