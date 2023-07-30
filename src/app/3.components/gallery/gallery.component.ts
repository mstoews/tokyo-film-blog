import { Component, Input, OnInit, signal } from '@angular/core';
import { imageItem } from 'app/5.models/imageItem';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() public imageCollection: imageItem[] = [];

  imageCount = signal<number>(0);
  imageItems = <imageItem[]>([]);
  

  ngOnInit(): void {
    this.imageCount.set(this.imageCollection.length);
    console.log(this.imageCount());
    if (this.imageCollection.length > 6) {
      this.imageItems = this.imageCollection.slice(0, 6);
    } else {
      this.imageItems = this.imageCollection;
    }
  }

  onPreviewImage(imageNumber: number) {

  }
}
