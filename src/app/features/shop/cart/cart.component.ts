import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'app/services/cart.service';
import { CheckoutService } from 'app/services/checkout.service';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'app/models/cart';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cart$: Observable<Cart[]>
  userId: string;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe((params) => {
      const cartItems = this.cartService.findCartByUserId(params.id)
      if (cartItems) {
        this.cart$ = cartItems;
        this.userId = params['id'];
      }
    })
  }

  backToShopping(){
    this.route.navigate(['shop']);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
