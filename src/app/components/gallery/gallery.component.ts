import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem } from 'app/models/imageItem'
import { rawImageItem } from 'app/models/rawImagesList';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {

  @Input() public imageCollection: imageItem[] = [];

  ngOnInit(): void {
   }

   onPreviewImage(imageNumber: number) {
      throw new Error('Method not implemented.');
   }


}
