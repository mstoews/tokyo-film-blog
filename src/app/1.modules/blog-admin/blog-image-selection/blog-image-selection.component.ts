import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';

import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { imageItem, imageItemIndex } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from 'app/1.modules/ui/advanced-search/advanced-search.module';
import { IImageStorage } from 'app/5.models/maintenance';
import { ProductsService } from 'app/4.services/products.service';

@Component({
  selector: 'blog-image-selection',
  templateUrl: './blog-image-selection.component.html',
  styleUrls: ['./blog-image-selection.component.css'],
})
export class BlogImageSelectionComponent implements OnInit, OnDestroy {
  @Input() blogId: string;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_THOUGHTS = 'IN_THOUGHTS';

  subNotUsed: Subscription;
  subThoughts: Subscription;

  not_usedImages: imageItemIndex[] = [];
  featuredImages: imageItemIndex[] = [];
  collectionsImages: imageItemIndex[] = [];

  constructor(
    public imageItemIndexService: ImageItemIndexService,
    private fb: FormBuilder
  ) {}

  async sortNotUsed() {
    return (
      await this.imageItemIndexService.getImageItemByType('IN_NOT_USED')
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

    this.subThoughts = (
      await this.imageItemIndexService.getImageItemByType(this.blogId)
    ).subscribe((item) => {
      this.collectionsImages = item;
    });
  }

  verifyArray() {}

  ngOnInit() {
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
    this.subThoughts.unsubscribe();
  }
}
