import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Product } from 'app/5.models/products';
import { imageItemIndex } from 'app/5.models/imageItem';
import { Observable } from 'rxjs';
import { ProductsService } from 'app/4.services/products.service';
import { ImageListService } from 'app/4.services/image-list.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'inventory-preview',
  templateUrl: './inventory-preview.component.html',
  styleUrls: ['./inventory-preview.component.css'],
})
export class InventoryPreviewComponent implements OnInit {
  @Input() product: Product;
  inventoryImages$: Observable<imageItemIndex[]>;
  mainImage: string;

  productService = inject(ProductsService);

  setImage(e: imageItemIndex): void {
    const searchString = e.imageAlt.substring(0, 15);
    console.debug('setImage', searchString);
    if (e.imageSrc400) {
      this.mainImage = e.imageSrc400;
    } else {
      this.mainImage = e.imageSrc200;
    }
  }

  onUpdate() {
    this.productService.updateMainImage(this.product.id, this.mainImage);
  }

  async ngOnInit() {

    this.mainImage = this.product.image;

    if (this.product.id) {
      this.inventoryImages$ = await this.productService.getImageListByProduct(
        this.product.id
      );
    }
  }
}
