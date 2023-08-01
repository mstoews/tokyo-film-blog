import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, map } from 'rxjs';
// import { ImageListService } from 'app/4.services/image-list.service';
import { imageItemIndex } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProductsService } from 'app/4.services/products.service';
import { DeleteDuplicateService } from 'app/4.services/delete-duplicate.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'collection-img-selection',
  templateUrl: './collection-image-selection.component.html',
  styleUrls: ['./collection-image-selection.component.css'],
})
export class CollectionImageSelectionComponent implements OnInit, OnDestroy {
  @Input() productId: string;

  currentImage: imageItemIndex;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_COLLECTION = 'IN_COLLECTION';

  subNotUsed: Subscription;
  subCollections: Subscription;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  not_usedImages: imageItemIndex[] = [];
  collectionsImages: imageItemIndex[] = [];

  firstRun: boolean = true;

  deleteDupes = inject(DeleteDuplicateService);
  imageItemIndexService = inject(ImageItemIndexService);
  productService = inject(ProductsService);
  fb = inject(FormBuilder);

  createImageOnce() {
    throw new Error('Method not implemented.');
  }
  RefreshList() {
    //this.deleteDupes.updateImages();
  }

  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  categoryGroup: FormGroup;

  onCreate() {
    throw new Error('Method not implemented.');
  }
  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onUpdate(arg0: any) {
    throw new Error('Method not implemented.');
  }

  RefreshImages() {
    throw new Error('Method not implemented.');
  }
  DeleteDupes() {
    throw new Error('Method not implemented.');
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

  addImageToItemList(image: any) {
    image.parentId = this.productId;
    this.imageItemIndexService.updateImageList(image);
  }

  UpdateInventoryItem(e: imageItemIndex) {
    e.type = this.IN_COLLECTION;
    this.imageItemIndexService.updateImageList(e);
  }

  async sortNotUsed() {
    return (
      await this.imageItemIndexService.getImageIndexList()
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
      await this.imageItemIndexService.getImageByType(this.IN_COLLECTION)
    ).subscribe((item) => {
      this.collectionsImages = item;
    });
  }

  ngOnInit() {
    // convert images to format of imageList
    // this.deleteDupes.deleteDuplicateImages();
    this.Refresh();
  }

  drop(event: CdkDragDrop<imageItemIndex[]>) {
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
      const image = imageItem[currentIndex];
      if (image.type === newContainerId) {
        image.ranking = 0;
        this.imageItemIndexService.updateImageList(image);
        return;
      }
      image.ranking = 0;
      image.type = newContainerId;
      this.imageItemIndexService.updateImageList(image);
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
