import { Component, Input, OnInit, signal } from '@angular/core';
import { initTE, Lightbox } from 'tw-elements';
import { imageItemIndex } from 'app/5.models/imageItem';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() public imageCollection: imageItemIndex[] = [];

  imageCount = signal<number>(0);
  imageItems = <imageItemIndex[]>([]);
  

  ngOnInit(): void {
    initTE({ Lightbox });
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
