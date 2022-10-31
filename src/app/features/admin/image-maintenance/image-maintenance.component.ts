import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDrawer } from '@angular/material/sidenav';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'image-maintenance',
  templateUrl: './image-maintenance.component.html',
  styleUrls: ['./image-maintenance.component.css'],
})
export class ImageMaintenanceComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  openTasks: any;
  priorities: any;
  task: any;
  imageGroup: FormGroup;
  onUpdate: any;
  cRAG: any;
  sTitle: any;

  public NOT_USED = 'NOT_USED';
  public FEATURED = 'FEATURED';
  public COLLECTIONS = 'COLLECTIONS';
  public CREATIONS = 'CREATIONS';
  public GALLERY = 'GALLERY';

  selected: string;

  subNotUsed: Subscription;
  subFeatured: Subscription;
  subCollections: Subscription;
  subCreations: Subscription;
  subGallery: Subscription;

  inventoryImages: imageItem[] = [];

  not_used: imageItem[] = [];
  featured: imageItem[] = [];
  collections: imageItem[];
  creations: imageItem[];
  gallery: imageItem[];

  constructor(
    public imageListService: ImageListService,
    public storage: AngularFireStorage) {
      this.Refresh();
  }

  Refresh() {
    this.subNotUsed = this.imageListService.getItemsByType('NOT_USED').subscribe((item) => { this.not_used = item; });
    this.subFeatured = this.imageListService.getItemsByType(this.FEATURED).subscribe((item) => { this.featured = item; });
    this.subCollections = this.imageListService.getItemsByType(this.COLLECTIONS).subscribe((item) => { this.collections = item; });
    this.subCreations = this.imageListService.getItemsByType(this.CREATIONS).subscribe((item) => { this.creations = item; });
    this.subGallery = this.imageListService.getItemsByType(this.GALLERY).subscribe((item) => { this.gallery = item; });
  }

  ImagesList() {
    this.storage
      .ref('/')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: imageItem = {
              caption: imageRef.fullPath,
              type: 'NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
            };
            this.inventoryImages.push(imageData);
            this.imageListService.update(imageData);
          });
        });
      });
  }

  ngOnInit(): void {

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
      this.updateBoards(
        event.previousContainer.data,
        event.container.data,
        event.container.id
      );
    }
  }

  private updateRanking(previousData: imageItem[]) {
    // loop through just the previous day
    // previous status is the same so not updated
    const cnt = previousData.length;
    if (cnt > 0) {
      let i = 1;
      previousData.forEach((task) => {
          task.ranking = i;
          this.imageListService.update(task);
        i++;
      });
    }
  }

  private updateBoards(
    previousData: any,
    newData: any,
    newContainerId: string
  ) {

    this.updateRanking(previousData);

    const cnt = newData.length;
    if (cnt > 0) {
      let i = 1;
      newData.forEach((image: imageItem) => {
        image.ranking = i;
        this.imageListService.update(image);
        i++;
      });
    }
  }

}

