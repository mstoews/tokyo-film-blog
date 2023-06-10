import { Component, Input, OnInit } from '@angular/core';
import { imageItem } from 'app/5.models/imageItem';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() public imageCollection: imageItem[] = [];
  imageCount = 0;

  ngOnInit(): void {
    this.imageCount = this.imageCollection.length;
    console.log('Image count', this.imageCount);
  }

  onPreviewImage(imageNumber: number) {

  }
}
