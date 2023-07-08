import { Component, EventEmitter, Input, Output } from '@angular/core';
import { imageItem } from 'app/5.models/imageItem';

@Component({
  selector: 'app-inventory-image-card',
  templateUrl: './inventory-image-card.component.html',
})
export class InventoryImageCardComponent {

  onDblClick(e: any) {
    this.imageSelected.emit(this.image)
  }

  @Input() image: imageItem;
  @Output() imageSelected: EventEmitter<imageItem> = new EventEmitter()


}
