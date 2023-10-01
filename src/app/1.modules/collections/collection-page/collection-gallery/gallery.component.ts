import { Component, Input, OnInit, signal } from '@angular/core';
import { ImageItemIndex } from 'app/5.models/imageItem';
import { Lightbox, initTE } from 'tw-elements';

@Component({
  selector: 'collection-gallery',
  templateUrl: './gallery.component.html',
})
export class CollectionGalleryComponent implements OnInit {
  @Input() public imageCollection: ImageItemIndex[] = [];

  imageCount = signal<number>(0);

  ngOnInit(): void {
    initTE({ Lightbox });
     this.imageCount.set(this.imageCollection.length);
    }

}
