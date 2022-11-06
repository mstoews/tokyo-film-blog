import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css']
})
export class ProductDetailsFiveComponent implements OnInit {

  productId: string;
  productItem: Observable<Product>;
  product: Product;
  sub: any;
  Products$: Observable<Product[]>;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productId =  params['id'];
      this.productService.getAll().subscribe( (products) => {
        products.forEach((product) => {
          if (product.id === this.productId) {
            this.product = product;
          }
        });
      });
   });

  }

}
