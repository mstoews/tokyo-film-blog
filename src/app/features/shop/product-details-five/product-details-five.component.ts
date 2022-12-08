import { Component, OnInit, OnDestroy } from '@angular/core'
import { Product } from 'app/models/products'
import { WishList } from 'app/models/wishlist'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductsService } from 'app/services/products.service'
import { Observable, Subscription } from 'rxjs'
import { WishListService } from 'app/services/wishlist.service'
import { CheckoutService } from 'app/services/checkout.service'

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css'],
})
export class ProductDetailsFiveComponent implements OnInit {
  productId: string
  purchaseStarted: boolean
  productItem$: Observable<Product | undefined>
  sub: Subscription
  Products$: Observable<Product[]>

  constructor(
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private route: Router,
    private wishList: WishListService,
    // private userCart: UserCartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe((params) => {
      const prd = this.productService.findProductByUrl(params['id'])
      if (prd) {
        this.productItem$ = prd
        this.productId = params['id']
      }
    })
  }

  onAddToWishList() {
    this.productItem$.subscribe((product) => {
      if (product) {
        // console.log('Add to wish list ...', product.id);
      }
    })
  }

  onAddToShoppingCart() {
    this.productItem$.subscribe((product) => {
      if (product) {
        // console.log('Add to shopping cart ...', product.id);
      }
    })
  }

  onContinueShopping() {
    this.route.navigate(['/shop'])
  }

  onGoShoppingCart() {
    // this.route.navigate(['/shop/payment']);

    this.purchaseStarted = true

    this.checkoutService.startProductCheckoutSession(this.productId).subscribe(
      (session) => {
        this.checkoutService.redirectToCheckout(session)
      },
      (err) => {
        // console.log('Error creating checkout session', err);
        this.purchaseStarted = false
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
