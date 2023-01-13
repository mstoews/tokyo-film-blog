import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from 'app/models/products';
import { imageItem } from 'app/models/imageItem';
import { Observable } from 'rxjs';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'inventory-preview',
  templateUrl: './inventory-preview.component.html',
  styleUrls: ['./inventory-preview.component.css'],
})

export class InventoryPreviewComponent implements OnInit {
  inventoryImages$: Observable<imageItem[]>;
  @Input() product: Product;
  images: imageItem[]=[];

  constructor(private productService: ProductsService){ }

  ngOnInit() {
    console.log(this.product);
    if(this.product.id){
      this.inventoryImages$ = this.productService.getProductImage(this.product.id);
    }

    if(this.inventoryImages$){
      this.inventoryImages$.subscribe(image => {
          image.forEach(img => {
            this.images.push(img);
          })
      })
    }
  }
}

