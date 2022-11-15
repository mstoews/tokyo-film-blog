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

  // image1: string;
  // image2: string;
  // image3: string;
  // image4: string;
  // image5: string;
  // image6: string;

  ngOnInit(): void {
    // if (this.imageCollection.length > 0) {
    //   this.image1 = this.imageCollection[0].imageSrc;
    // }
    // if (this.imageCollection.length > 0) {
    //   this.image2 = this.imageCollection[1].imageSrc;
    // }

    // if (this.imageCollection.length > 0) {
    //   this.image3 = this.imageCollection[2].imageSrc;
    // }

    // if (this.imageCollection.length > 0) {
    //   this.image4 = this.imageCollection[3].imageSrc;
    // }

    // if (this.imageCollection.length > 0) {
    //   this.image5 = this.imageCollection[4].imageSrc;
    // }

    // if (this.imageCollection.length > 0) {
    //   this.image6 = this.imageCollection[5].imageSrc;
    // }
   }

   onPreviewImage(imageNumber: number) {
      throw new Error('Method not implemented.');
   }


}
