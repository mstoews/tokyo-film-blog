import { Component, OnInit } from '@angular/core';
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
  allImageList$: Observable<IImageMaintenance[]>;
  collapsed = false;
  sTitle: string;

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
  }


  selectedItemKeys: any[] = [];

  selectionChanged(data: any) {
    console.log(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys;
  }

  columns = ['title', 'sub_title' , 'image_url',  'applied', 'user_updated','date_created',  'date_updated']



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

  customizeTooltip = (pointsInfo: any) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });

}

