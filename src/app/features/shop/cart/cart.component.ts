import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { CartService } from 'app/services/cart.service';
import { CheckoutService } from 'app/services/checkout.service';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'app/models/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cart$: Observable<Cart []| undefined>
  userId: string;
  total: number;
  tax: number;
  shipping: number;
  grand_total: number;
  cartData: any;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params.id
    this.cart$ = this.cartService.cartByUserId(this.userId);
    this.calculateTotals();
  }

  onCheckOut(){
    this.route.navigate(['/shop/coming-soon']);

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

  calculateTotals(){
    this.grand_total = 0.0;
    this.total = 0.0;
    let total = 0.0;
    let tax = 0.0;
    this.cart$.subscribe(result => {
      result.forEach(item => {
        var pricestring = item.price;
        var price: number = +pricestring;
        total = price + total;
      })
      let grand_total = 0;
      this.total = total;
      this.tax = Math.trunc(this.total * .10)
      this.shipping = Math.trunc(this.total * .05);
      this.grand_total = this.round(this.total + this.tax + this.shipping, 2);
      console.log(`Tax : ${this.tax} ${this.total} ${this.shipping} ${grand_total}`)
    })
  }

  round(number: number, precision: number) {
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
    else
      return +(Math.round(Number(number + "e+" + precision)) +
      "e-" + precision);
  }


  backToShopping(){
    this.route.navigate(['shop']);
  }

  ngOnDestroy(): void {

  }

  onRemoveItem(item: string){
    this.cartService.delete(item);
    this.calculateTotals();
  }



}
