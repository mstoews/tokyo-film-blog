import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Product } from 'app/5.models/products';
import { imageItem } from 'app/5.models/imageItem';
import { Observable } from 'rxjs';
import { ProductsService } from 'app/4.services/products.service';

@Component({
  selector: 'inventory-preview',
  templateUrl: './inventory-preview.component.html',
  styleUrls: ['./inventory-preview.component.css'],
})
export class InventoryPreviewComponent implements OnInit {

  @Input() product: Product;
  inventoryImages$: Observable<imageItem[]>;
  mainImage: string;

  productService = inject(ProductsService);

  setImage(e: string) {
    this.mainImage = e;
  }

  onUpdate() {
    this.productService.updateMainImage(this.product.id, this.mainImage);
  }

  ngOnInit() {
    // if (this.product.id) {
    //   this.productService.findProductByUrl(this.product.id).subscribe((prd) => {
    //     this.product = prd;
    //   });
    // }

    this.mainImage = this.product.image;

    if (this.product.id) {
      this.inventoryImages$ = this.productService.getImageListByProduct(
        this.product.id
      );
    }
  }
}
