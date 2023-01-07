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
  header_title = "Wishlist";

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


  backToShopping(){
    this.route.navigate(['shop']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRemoveItem(item: string){
    this.wishListService.delete(item);

  }

  addToCart(productId: string, itemId: string) {
    this.wishListService.delete(itemId);
    this.wishListService.addToCart(productId);
  }
}

