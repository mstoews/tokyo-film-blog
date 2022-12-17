import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishListService } from 'app/services/wishlist.service';
import { CheckoutService } from 'app/services/checkout.service';
import { Observable, Subscription } from 'rxjs';
import { WishList } from 'app/models/wishlist';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  wishList$: Observable<WishList[]>
  userId: string;
  total: number;
  tax: number;
  shipping: number;
  grand_total: number;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private wishListService: WishListService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe((params) => {
      const wishListItems = this.wishListService.wishListByUserId(params.id)
      if (wishListItems) {
        this.wishList$ = wishListItems;
        this.userId = params['id'];
      }
    })

  }

  backToHome(){
    this.route.navigate(['home']);
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
    this.sub.unsubscribe();
  }

  onRemoveItem(item: string){
    this.wishListService.delete(item);
    this.calculateTotals();
  }

  addToCart(item: string){
    this.wishListService.addToCart(item)
  }

  calculateTotals(){
    this.grand_total = 0.0;
    this.total = 0.0;
    let total = 0.0;
    let tax = 0.0;
    this.wishList$.subscribe(result => {
      result.forEach(item => {
        var pricestring = item.price;
        var price: number = +pricestring;
        total = price + total;
      })
      let grand_total = 0;
      this.total = total;
      this.tax = this.total * .10
      this.shipping = this.total * .05;
      this.grand_total = this.round(this.total + this.tax + this.shipping, 2);
      console.log(`Tax : ${this.tax} ${this.total} ${this.shipping} ${grand_total}`)
    })
  }


}
8
