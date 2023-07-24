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
import { imageItem } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { IImageStorage } from 'app/5.models/maintenance';
import { ProductsService } from 'app/4.services/products.service';
import { DeleteDuplicateService } from 'app/4.services/delete-duplicate.service';

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
    return this.imageListService.getImagesBySize('200').pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.caption < b.caption ? -1 : 1;
        });
        return data;
      })
    );
  }

  Refresh() {
    // this.deleteDupes.deleteDuplicateImages();
    // this.deleteDupes.createOrginalImageMap();

    // this.imageListService.createImageSrc('/', 'original');
    // this.imageListService.createImageSrc('/thumbnails', 'small');
    // this.imageListService.createImageSrc('/400', 'medium');
    // this.imageListService.createImageSrc('/800', 'large');

    this.subNotUsed = this.sortNotUsed().subscribe((item) => {
      this.not_usedImages = item;
    });

    this.subDeleted = this.imageListService
      .getImagesByType(this.IN_DELETED)
      .subscribe((item) => {
        this.deletedImages = item;
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

  // private updateRanking(previousData: any[]) {
  //   const cnt = previousData.length;
  //   if (cnt > 0) {
  //     let i = 1;
  //     previousData.forEach((image) => {
  //       image.ranking = i;
  //       image.parentId = this.productId;
  //       this.imageListService.updateImageList(image);
  //       i++;
  //     });
  //   }
  // }

  // private updateImageType(
  //   previousData: any,
  //   newData: any,
  //   newContainerId: string,
  //   currentIndex: number
  // ) {
  //   // console.debug('Updatedate Image Type', JSON.stringify(newData));
  //   const cnt = newData.length;
  //   if (cnt > 0) {
  //     let i = 1;
  //     newData.forEach((image: imageItem) => {
  //       image.ranking = i;
  //       image.parentId = this.productId;
  //       image.type = newContainerId;
  //       this.imageListService.updateImageList(image);
  //       i++;
  //     });
  //   }
  // }

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
    console.debug('Update Image Type', image);
    this.imageListService.updateImageList(image);
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subDeleted.unsubscribe();
    this.subCollections.unsubscribe();
  }
}
