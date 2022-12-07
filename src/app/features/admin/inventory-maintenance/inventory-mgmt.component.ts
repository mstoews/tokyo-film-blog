import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';


import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'inventory-maintenance',
  templateUrl: './inventory-mgmt.component.html',
  styleUrls: ['./inventory-mgmt.component.css'],
})
export class InventoryMgmtComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  @Input() not_usedImages: imageItem[] = [];
  @Input() usedImages: imageItem[] = [];

  drawOpen: 'open' | 'close' = 'open';
  imageGroup: FormGroup;
  onUpdate: any;
  cRAG: any;
  sTitle: any;

  IN_NOT_USED = 'IN_NOT_USED';
  IN_USE = 'IN_USE';

  subNotUsed: Subscription;
  subUsed: Subscription;

  constructor(
        private imageListService: ImageListService,
        private productService: ProductsService ) {

      }

  printImageList(title: string, images: imageItem[])
  {
    images.forEach(img => {
      console.log(`${title} caption: ${img.caption} ranking: ${img.ranking} ${img.imageSrc}`);
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

  drop(event: CdkDragDrop<imageItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateRanking(event.container.data);
    }
    else
    {
      transferArrayItem (
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
          this.imageListService.update(image, image.id );
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
      newData.forEach((image: any) => {
        image.ranking = i;
        image.type = newContainerId;
        console.log('Updating ', image.imageSrc);
        this.imageListService.update(image, image.id);
        i++;
      });
    }
  }

  ngOnDestroy() {
    this.subNotUsed.unsubscribe();
    this.subUsed.unsubscribe();
  }

}

