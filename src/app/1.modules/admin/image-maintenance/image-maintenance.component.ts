import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DndComponent } from '../../../3.components/loaddnd/dnd.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'image-maintenance',
  templateUrl: './image-maintenance.component.html',
  styleUrls: ['./image-maintenance.component.css'],
})
export class ImageMaintenanceComponent implements OnInit, OnDestroy {
onTabClick($event: any) {
throw new Error('Method not implemented.');
}
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  imageGroup: FormGroup;
  onUpdate: any;
  cRAG: any;
  sTitle: any;
  currentImage: imageItem;

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
    private matDialog: MatDialog,
    private fb: FormBuilder
  ) {}

  RefreshList() {
    this.imageListService.createRawImagesList();
  }

  onImageSelected(e: any) {
    console.log('onImageSelected: ' + JSON.stringify(e));
  }

  createImageOnce() {
    // const data: imageItem = {
    //   id: '',
    //   parentId: '',
    //   imageSrc: 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2Fmunchdeathblog1_800x800.jpg?alt=media&token=9a754e17-5309-494d-9f56-7ab492bd7c85',     imageAlt: '800/munchdeathblog1_800x800.jpg',
    //   caption: 'munchdeathblog1_800x800.jpg',
    //   type: 'IN_NOT_USED',
    //   ranking: 1
    // }
    // this.imageListService.createItem(data);
    this.onImages();
    //alert('The one off updated is now disabled');
  }

  onImages() {
    const parentId = '';
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: {
        parent: '',
        location: 'inventory',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          //this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
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

    // this.printImageList('Featured', this.featuredImages)
    // this.printImageList('Collections', this.collectionsImages)
    // this.printImageList('Creations', this.creationsImages)
    // this.printImageList('Gallery', this.galleryImages)
  }

  createEmptyForm() {
    this.imageGroup = this.fb.group({
      parentId: [''],
      caption: [''],
      imageAlt: [''],
      imageSrc: [''],
      ranking: [''],
      type: [''],
    });
  }

  ngOnInit() {
    // this.imageListService.createImageList()
    this.createEmptyForm();
    this.Refresh();
  }

  onOpenDrawer($event: any) {
    // console.debug('onOpenDrawer', $event);
    this.toggleDrawer();
  }

  Clone() {
    throw new Error('Method not implemented.');
  }

  Add() {
    // console.debug('toggle drawer');
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
