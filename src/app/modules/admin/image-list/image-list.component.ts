import { Component } from '@angular/core';
import { ImageListService } from '../../../services/image-list.service';
import { imageItem } from '../../../models/imageItem';
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
  // constructor(
  //     private imageListService: ImageListService) {
  //
  //     const data: imageItem = {
  //       id: '',
  //       parentId: '',
  //       imageSrc: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2Fmunchdeathblog1_800x800.jpg?alt=media&token=9a754e17-5309-494d-9f56-7ab492bd7c85'
  // ,     imageAlt: '800/munchdeathblog1_800x800.jpg',
  //       caption: 'munchdeathblog1_800x800.jpg',
  //       type: 'NOT_IN_USE',
  //       ranking: 1
  //     }
  //     imageListService.createItem(data);

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

  not_usedImages: imageItem[] = [];
  featuredImages: imageItem[] = [];
  collectionsImages: imageItem[] = [];
  creationsImages: imageItem[] = [];
  galleryImages: imageItem[] = [];

  constructor(
    public imageListService: ImageListService,
    private fb: FormBuilder
  ) {
    this.imageListService.createRawImagesList();
    // const data: imageItem = {
    //   id: '',
    //   parentId: '',
    //   imageSrc: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2Fmunchdeathblog1_800x800.jpg?alt=media&token=9a754e17-5309-494d-9f56-7ab492bd7c85',     imageAlt: '800/munchdeathblog1_800x800.jpg',
    //   caption: 'munchdeathblog1_800x800.jpg',
    //   type: 'NOT_IN_USE',
    //   ranking: 1
    // }
    // imageListService.createItem(data);
  }

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
        this.collectionsImages = item;
      });
    this.subCreations = this.imageListService
      .getImagesByType(this.IN_CREATION)
      .subscribe((item) => {
        this.creationsImages = item;
      });
    this.subGallery = this.imageListService
      .getImagesByType(this.IN_GALLERY)
      .subscribe((item) => {
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
    this.subCreations.unsubscribe();
    this.subGallery.unsubscribe();
  }
}
