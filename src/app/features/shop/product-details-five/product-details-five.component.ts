import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute, Route, Router, TitleStrategy } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable, pluck, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css']
})
export class ProductDetailsFiveComponent implements OnInit {

  productId: string;
  productItem: Observable<Product>;
  product!: Product;
  sub: Subscription;
  Products$: Observable<Product[]>;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductsService)
    { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
         const prd = this.productService.findProductByUrl(params['id']);
         prd.subscribe((prod) => {
            this.product = prod as Product;
         })
    });
  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {
    this.route.navigate(['/shop/payment']);
  }


}
