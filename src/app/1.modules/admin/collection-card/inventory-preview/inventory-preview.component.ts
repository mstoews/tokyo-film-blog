import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  inventoryImages$: Observable<imageItem[]>;
  @Input() product: Product;
  images: imageItem[] = [];
  mainImage: string;

  constructor(private productService: ProductsService) {}

  setImage(e: string) {
    this.mainImage = e;
  }

  onUpdate() {
    // set current image as main image
    this.productService.updateMainImage(this.product.id, this.mainImage);
  }

  ngOnInit() {
    if (this.product.id) {
      this.productService.findProductByUrl(this.product.id).subscribe((prd) => {
        this.product = prd;
      });
    }

    if (this.product.id) {
      this.inventoryImages$ = this.productService.getImageListByProduct(
        this.product.id
      );
    }

    if (this.inventoryImages$) {
      this.inventoryImages$.subscribe((image) => {
        var count = 0;
        image.forEach((img) => {
          if (count === 0) {
            this.mainImage = img.imageSrc;
          }
          this.images.push(img);
          count++;
        });
      });
    }
  }
}
