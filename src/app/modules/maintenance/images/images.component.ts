import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { IImageMaintenance } from 'app/interfaces/mt-ImageMaintenance';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ImageMaintenanceService } from '../image-maintenance.service';



@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  allImageList$: Observable<IImageMaintenance[]>;
  collapsed = false;
  sTitle: string;
  drawOpen: 'open' | 'close' = 'open';
  prdGroup: FormGroup;
  action: string;
  currentDate: Date;
  image: IImageMaintenance;
  imageId: string;


  constructor(
    private imageMaintanenceService: ImageMaintenanceService) {
    this.allImageList$ = this.imageMaintanenceService.getAll();
  }

    ngOnInit(): void {
      console.log('Starting Image Maintenance');
      this.sTitle = "Image Maintenance"
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['Id']);
    }
  };

  onCellDoublClicked(data: any ){
    console.log(data);
    this.openDrawer()
  }


  selectedItemKeys: any[] = [];

  onNotify(event: any) {
    console.log(event);
    this.prd = event;
    this.createForm(this.prd);
    this.toggleDrawer();
  }

  createForm(prd: IImageMaintenance) {
    this.sTitle = 'Inventory - ' + prd.title;

    const dDate = new Date(prd.date_updated);
    const dueDate = dDate.toISOString().split('T')[0];

    const sDate = new Date(prd.date_created);
    const startDate = sDate.toISOString().split('T')[0];

    this.prdGroup = this.fb.group({
        id:                 [prd.id],
        description:        [prd.title],
        rich_description:   [prd.sub_title],
        image:              [prd.image_url],
        user_updated:       [prd.user_updated],
        date_created:       [prd.date_created],
        date_updated:       [prd.date_updated]
    });
  }


  selectionChanged(data: any) {
    console.log(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys;
  }

  columns = ['title', 'sub_title' , 'image_url',  'applied', 'user_updated','date_created',  'date_updated']

  Add() {
    console.log('open drawer to add ... ');
    this.openDrawer();
  }

  Delete() {
    console.log('open drawer to delete ... ');
    this.openDrawer();
  }

  Clone() {
    console.log('open drawer to clone ... ');
    this.openDrawer();
  }

  onCreate() {
      const newItem = { ...this.prdGroup.value} as IImageMaintenance;
      console.log(`onCreate ${newItem}`);
      this.imageMaintanenceService.create(newItem);
  }

  onUpdate(data: IImageMaintenance) {
      console.log(`onUpdate:  ${data}`);
      data = this.prdGroup.getRawValue();
      this.imageMaintanenceService.update(data);

  }

  onDelete(data: IImageMaintenance) {
      data = this.prdGroup.getRawValue();
      this.imageMaintanenceService.delete(data.id.toString());

  }

  closeDialog() {
    this.closeDrawer();
  }

  testInput (){

    const date = new Date();


    const image = {
      id:               1,
      title:            'TEST',
      sub_title:        'TEST',
      image_url:        'TEST',
      applied:           true,
      user_updated:     'TEST',
      date_created:      date,
      date_updated:      date
    }
    this.imageMaintanenceService.create(image)
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

  customizeTooltip = (pointsInfo: any) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });

}


