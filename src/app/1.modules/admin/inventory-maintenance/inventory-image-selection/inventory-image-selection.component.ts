import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem, imageItemIndex } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { IImageStorage } from 'app/5.models/maintenance';
import { ProductsService } from 'app/4.services/products.service';
import { DeleteDuplicateService } from 'app/4.services/delete-duplicate.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'inventory-image-selection',
  templateUrl: './inventory-image-selection.component.html',
  styleUrls: ['./inventory-image-selection.component.css'],
})
export class InventoryImageSelectionComponent implements OnInit, OnDestroy {
  createImageOnce() {
    throw new Error('Method not implemented.');
  }
  RefreshList() {
    throw new Error('Method not implemented.');
  }
  @Input() productId: string;

  currentImage: imageItem;

  IN_NOT_USED = 'IN_NOT_USED';

  IN_COLLECTION = 'IN_COLLECTION';

  subNotUsed: Subscription;

  subMain: Subscription;
  subCollections: Subscription;

  not_usedImages: imageItemIndex[] = [];
  deletedImages: imageItemIndex[] = [];
  collectionsImages: imageItemIndex[] = [];
  inventoryImages$: Observable<imageItemIndex[]>;
  firstRun: boolean = true;

  deleteDupes = inject(DeleteDuplicateService);
  // imageListService = inject(ImageListService);
  imageItemIndexService = inject(ImageItemIndexService);
  productService = inject(ProductsService);
  fb = inject(FormBuilder);

  addImageToItemList(image: any) {
    image.parentId = this.productId;
    // search for the image in the list 400 size and add it to the list
    this.imageItemIndexService.updateImageList(image);
  }

  UpdateInventoryItem(e: imageItemIndex) {
    e.type = this.productId;
    this.imageItemIndexService.updateImageList(e);
  }

  async sortNotUsed() {
    return (
      await this.imageItemIndexService.getImageByType(this.IN_NOT_USED)
    ).pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.caption < b.caption ? -1 : 1;
        });
        return data;
      })
    );
  }

  async Refresh() {
    this.subNotUsed = (await this.sortNotUsed()).subscribe((item) => {
      this.not_usedImages = item;
    });

    this.subCollections = (
      await this.imageItemIndexService.getOriginalImageListByType(
        this.productId
      )
    ).subscribe((item) => {
      this.collectionsImages = item;
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
    imageItemIndex: any,
    currentIndex: number,
    newContainerId: string
  ) {
    if (newContainerId !== this.IN_NOT_USED) {
      imageItemIndex.forEach((element: any) => {
        element.ranking = imageItemIndex.indexOf(element);
        this.imageItemIndexService.updateImageList(element);
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
    console.debug('Update Image Type', image);
    this.imageItemIndexService.updateImageList(image);
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subCollections.unsubscribe();
  }
}
