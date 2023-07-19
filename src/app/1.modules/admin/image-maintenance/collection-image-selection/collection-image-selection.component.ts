import { Component, OnInit, ViewChild, OnDestroy, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProductsService } from 'app/4.services/products.service';
import { DeleteDuplicateService } from 'app/4.services/delete-duplicate.service';

@Component({
  selector: 'collection-img-selection',
  templateUrl: './collection-image-selection.component.html',
  styleUrls: ['./collection-image-selection.component.css'],
})
export class CollectionImageSelectionComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  currentImage: imageItem;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_DELETED = 'IN_DELETED';
  IN_COLLECTION = 'IN_COLLECTION';

  subNotUsed: Subscription;
  subDeleted: Subscription;
  subMain: Subscription;
  subCollections: Subscription;

  not_usedImages: imageItem[] = [];
  deletedImages: imageItem[] = [];
  collectionsImages: imageItem[] = [];
  inventoryImages$: Observable<imageItem[]>;
  firstRun: boolean = true;

  deleteDupes = inject(DeleteDuplicateService);
  imageListService = inject(ImageListService);
  productService = inject(ProductsService);
  fb = inject(FormBuilder);


  createImageOnce() {
    throw new Error('Method not implemented.');
  }
  RefreshList() {
    this.deleteDupes.updateImages();
  }


  addImageToItemList(image: any) {
    image.parentId = this.productId;
    // search for the image in the list 400 size and add it to the list
    this.imageListService.updateImageList(image);
  }

  UpdateInventoryItem(e: imageItem) {
    e.type = this.productId;
    this.imageListService.updateImageList(e);
  }

  sortNotUsed() {
    return this.imageListService.getImagesBySize('400').pipe(map((data) => {
      data.sort((a, b) => {
        return a.caption < b.caption ? -1 : 1;
      });
      return data;
    }))
  }

  Refresh() {



    this.subNotUsed = this.sortNotUsed().subscribe((item) => {
      this.not_usedImages = item;
    });


    this.subCollections = this.imageListService
      .getImagesByType(this.productId)
      .subscribe((item) => {
        this.collectionsImages = item;
      });

  }

  ngOnInit() {
    // convert images to format of imageList
    // this.deleteDupes.deleteDuplicateImages();
    this.Refresh();
  }

  drop(event: CdkDragDrop<imageItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateRanking(event.container.data, event.currentIndex, event.container.id);
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

  private updateRanking(imageItem: any, currentIndex: number, newContainerId: string) {
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
    console.log('Update Image Type', image);
    this.imageListService.updateImageList(image);
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subDeleted.unsubscribe();
    this.subCollections.unsubscribe();
  }
}
