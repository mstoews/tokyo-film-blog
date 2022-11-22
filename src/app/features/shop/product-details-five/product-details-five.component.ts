import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css']
})
export class ProductDetailsFiveComponent implements OnInit {

  productId: string;
  productItem$: Observable<Product | undefined>;
  sub: Subscription;
  Products$: Observable<Product[]>;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
         const prd = this.productService.findProductByUrl(params['id']);
         if (prd){
          this.productItem$ = prd;
         }
    });
  }

  onAddToWishList()
  {
    this.productItem$.subscribe(product => {
      if (product){
         console.log('Add to wish list ...', product.id);
      }
    })

  }

  onAddToShoppingCart()
  {
    this.productItem$.subscribe(product => {
      if (product){
         console.log('Add to shopping cart ...', product.id);
      }
    })
  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {
    this.route.navigate(['/shop/payment']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
