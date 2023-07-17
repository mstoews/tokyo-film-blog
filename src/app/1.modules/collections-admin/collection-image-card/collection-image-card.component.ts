import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { imageItem } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';

@Component({
  selector: 'collection-image-card',
  templateUrl: './collection-image-card.component.html',
})
export class CollectionImageCardComponent {

  imageListService = inject(ImageListService);
  @Input() image: imageItem;
  @Output() collectionImageSelected: EventEmitter<imageItem> = new EventEmitter()

  onDblClick(e: any): void {
    console.log(this.image);
    this.collectionImageSelected.emit(this.image)
  }

}
