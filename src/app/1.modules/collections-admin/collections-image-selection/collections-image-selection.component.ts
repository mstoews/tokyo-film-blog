import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'collection-image-selection',
  templateUrl: './collections-image-selection.component.html',
  styleUrls: ['./collections-image-selection.component.css'],
})
export class CollectionsImageSelectionComponent implements OnInit, OnDestroy {
  @Input() collectionId: string;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_FEATURED = 'IN_INVENTORY';
  IMAGE_SIZE = '200';

  subNotUsed: Subscription;
  subCollections: Subscription;

  not_usedImages: imageItem[] = [];
  collectionsImages: imageItem[] = [];

  constructor(
    public imageListService: ImageListService,
    private fb: FormBuilder
  ) {}

  UpdateInventoryItem(e: imageItem) {
    console.debug(e);
    e.type = this.collectionId;
    this.imageListService.updateImageList(e);
    this.subNotUsed = this.imageListService
      .getImagesBySize(this.IMAGE_SIZE)
      .subscribe((item) => {
        this.not_usedImages = item;
      });
  }

  async Refresh() {
    await this.imageListService.createRawImagesList_200();

    this.subNotUsed = this.imageListService
      .getImagesBySize(this.IMAGE_SIZE)
      .subscribe((item) => {
        this.not_usedImages = item;
      });

    this.subCollections = this.imageListService
      .getImagesByType(this.collectionId)
      .subscribe((item) => {
        this.collectionsImages = item;
      });
    // this.verifyArray()
  }

  verifyArray() {
    console.debug(`Not used images: ${this.not_usedImages.length}`);
    console.debug(`Main images: ${this.collectionsImages.length}`);
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
      this.updateRanking(
        event.container.data,
        event.currentIndex,
        event.container.id
      );
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

  private updateRanking(
    imageItem: any,
    currentIndex: number,
    newContainerId: string
  ) {
    if (newContainerId !== this.IN_NOT_USED) {
      imageItem.forEach((element: any) => {
        element.ranking = imageItem.indexOf(element);
        this.imageListService.updateImageList(element);
      });
    }
  }

  private updateImageType(
    previousData: any,
    newData: any,
    newContainerId: string,
    currentIndex: number
  ) {
    const image = newData[currentIndex];
    image.ranking = 0;
    image.type = newContainerId;
    this.imageListService.updateImageList(image);
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subCollections.unsubscribe();
  }
}
