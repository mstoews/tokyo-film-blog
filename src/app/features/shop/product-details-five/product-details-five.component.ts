import { Component, OnInit, OnDestroy } from '@angular/core'
import { Product } from 'app/models/products'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductsService } from 'app/services/products.service'
import { Observable, Subscription } from 'rxjs'
import { WishListService } from 'app/services/wishlist.service'
import { CheckoutService } from 'app/services/checkout.service'
import { CartService } from 'app/services/cart.service'
import { AuthService } from 'app/services/auth/auth.service'


@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css'],
})
export class ProductDetailsFiveComponent implements OnInit, OnDestroy {

  purchaseStarted: boolean
  productItem$: Observable<Product | undefined>
  productId: string
  Products$: Observable<Product[]>
  sub: Subscription

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private wishList: WishListService,
    private productService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe((params) => {
      const prd = this.productService.findProductByUrl(params['id'])
      if (prd) {
        this.productItem$ = prd;
        this.productId = params['id'];
      }
    })
  }

  onAddToWishList() {
    if (this.productId){
      this.wishList.createWishList(this.productId);
    }
  }

  onAddToShoppingCart() {
    if (this.productId){
      this.wishList.addToCart(this.productId);
    }
    // this.route.navigate(['/cart:userid'])
  }

  onContinueShopping() {
    this.route.navigate(['/shop'])
  }

  onGoShoppingCart() {

    this.route.navigate(['shop/cart', this.authService.userData.uid]);

    // this.purchaseStarted = true

    // this.checkoutService.startProductCheckoutSession(this.productId).subscribe(
    //   (session) => {
    //     this.checkoutService.redirectToCheckout(session)
    //   },
    //   (err) => {
    //     // console.log('Error creating checkout session', err);
    //     this.purchaseStarted = false
    //   }
    // )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
