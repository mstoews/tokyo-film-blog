import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { imageItemIndex } from 'app/5.models/imageItem';
import { openViewComponentDialog } from '../../../shop/shop-inventory-maintenance/inventory-image-card/view-image-item/view-image-item.component';
// view-image-item/view-image-item.component
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'image-maintenance-card',
  template: `
    <div (dblclick)="onDblClick($event)">
      <img
        [ngSrc]="image.imageSrc200"
        [alt]="image.imageAlt"
        width="100"
        height="100"
        priority
      />
    </div>
  `,
})
export class ImageMaintenanceCardComponent {
  dialog = inject(MatDialog);

  onDblClick(e: any) {
    this.imageSelected.emit(this.image);
    // openViewComponentDialog(this.dialog, this.image, this.productId);
  }

  onView() {
    let image = {
      description: this.image.description,
      caption: this.image.caption,
      imageSrc: this.image.imageSrc200,
      imageAlt: this.image.imageAlt,
      type: this.image.type,
      id: this.image.id,
    };
    console.debug(JSON.stringify(image));
    openViewComponentDialog(this.dialog, image, this.productId);
  }

  @Input() image: imageItemIndex;
  @Input() productId: string;
  @Output() imageSelected: EventEmitter<imageItemIndex> = new EventEmitter();
}
