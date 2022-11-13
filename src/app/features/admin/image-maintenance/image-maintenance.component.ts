import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDrawer } from '@angular/material/sidenav';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';
import { rawImageItem } from 'app/models/rawImagesList';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'image-maintenance',
  templateUrl: './image-maintenance.component.html',
  styleUrls: ['./image-maintenance.component.css'],
})
export class ImageMaintenanceComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  imageGroup: FormGroup;
  onUpdate: any;
  cRAG: any;
  sTitle: any;

  public NOT_USED = 'IN_NOT_USED';
  public FEATURED = 'IN_FEATURED';
  public COLLECTIONS = 'IN_COLLECTIONS';
  public CREATIONS = 'IN_CREATIONS';
  public GALLERY = 'IN_GALLERY';

  subNotUsed: Subscription;
  subFeatured: Subscription;
  subCollections: Subscription;
  subCreations: Subscription;
  subGallery: Subscription;

  not_used: imageItem[] = [];
  featured: imageItem[] = [];
  collections: imageItem[];
  creations: imageItem[];
  gallery: imageItem[];

  constructor(
    public imageListService: ImageListService ) {

  }

  Refresh() {
    this.subNotUsed = this.imageListService.getImagesByType(this.NOT_USED).subscribe((item) => { this.not_used = item; });
    this.subFeatured =    this.imageListService.getImagesByType(this.FEATURED).subscribe((item) => { this.featured = item; });
    this.subCollections = this.imageListService.getImagesByType(this.COLLECTIONS).subscribe((item) => { this.collections = item; });
    this.subCreations =   this.imageListService.getImagesByType(this.CREATIONS).subscribe((item) => { this.creations = item; });
    this.subGallery =     this.imageListService.getImagesByType(this.GALLERY).subscribe((item) => { this.gallery = item; });

    this.not_used.forEach(item => {
        console.log(JSON.stringify(item));
    });

    // const imageList = this.imageListService.getImagesList();
    // imageList.subscribe(images => {
    //   images.forEach(img => {
    //       console.log(JSON.stringify(img));
    //   }
    //   );
    // })
  }


  ngOnInit() {
    this.imageListService.createRawImagesList();
    this.imageListService.createImageList();
    this.Refresh();
  }

  Clone() {
    throw new Error('Method not implemented.');
  }
  Add() {
    console.log('toggle drawer');
    this.toggleDrawer();
  }
  Delete() {
    throw new Error('Method not implemented.');
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

  closeDrawer() {
    throw new Error('Method not implemented.');
  }

  onDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onCreate(arg0: any) {
    throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<imageItem[]>): void {
    // transfers position of the data in memory,
    // if the drop was within the same container and reordering only Index is the position vertically

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
      previousData.forEach((task) => {
          task.ranking = i;
          this.imageListService.update(task, task.id );
        i++;
      });
    }
  }

  private updateImageType(
    previousData: any,
    newData: any,
    newContainerId: string
  ) {

    this.updateRanking(previousData);

    const cnt = newData.length;
    if (cnt > 0) {
      let i = 1;

      // this.imageListService.update(newData[0], newData[0].id );
      newData.forEach((image: any) => {
        image.ranking = i;
        image.type = newContainerId;
        console.log(JSON.stringify(image));
        this.imageListService.update(image, image.id );
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

