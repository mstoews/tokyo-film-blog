import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'app/5.models/products';
import { Router } from '@angular/router';
import { WishListService } from 'app/4.services/wishlist.service';
import { UserService } from 'app/4.services/auth/user.service';
import { Category } from 'app/5.models/category';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'app/4.services/auth/auth.service';
import { CartService } from 'app/4.services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCardComponent implements OnInit {
  @Input() product: Product;
  productIds: string[] = [];
  wishListIds: string[] = [];
  loggedIn: boolean = false;
  productId: string;
  Products$: Observable<Product[]>;
  Categories$: Observable<Category[]>;
  sub: Subscription;
  cartCount = 0;
  wishListCount = 0;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishListService,
    private userService: UserService,
    private route: Router,
    private snackBar: MatSnackBar,
    private wishList: WishListService
  ) {}

  ngOnInit(): void {
    this.productIds = [];
    this.wishListIds = [];

    this.productId = this.product.id;

    // console.log('User id from cart', this.authService.userData.uid);

    if (this.authService.userData) {
      this.cartService
        .cartByUserId(this.authService.userData.uid)
        .subscribe((cart) => {
          this.cartCount = cart.length;
          cart.forEach((item) => {
            this.productIds.push(item.product_id);
          });
        });

      this.wishlistService
        .wishListByUserId(this.authService.userData.uid)
        .subscribe((wishlist) => {
          this.wishListCount = wishlist.length;
          wishlist.forEach((item) => {
            this.wishListIds.push(item.product_id);
          });
        });
    }
  }

  addToCart() {
    this.onAddToShoppingCart();
  }

  existsInWishList(): boolean {
    let found = this.wishListIds.find((item) => {
      return item === this.productId;
    });
    if (found) {
      this.snackBar.open(
        'The item already exists in your wishlist ... ',
        'Close',
        {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
        }
      );

      return true;
    }
    return false;
  }

  existsInCart(): boolean {
    let found = this.productIds.find((item) => {
      return item === this.productId;
    });
    if (found) {
      this.snackBar.open('The item already exists in your cart ... ', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
        duration: 3000,
      });
      return true;
    }
    return false;
  }

  onAddToWishList() {
    let inWishList: Boolean;
    let inCart: Boolean;

    this.userService.isLoggedIn$.subscribe((user) => {
      this.loggedIn = user;
      if (this.loggedIn === true) {
        inWishList = this.existsInWishList();
        if (inWishList === false) {
          inCart = this.existsInCart();
        }
        if (inCart === false) {
          this.wishlistService.createWishList(this.productId);
          this.wishListIds.push(this.productId);
        }
      } else {
        this.route.navigate(['/profile']);
      }
    });
  }

  onAddToShoppingCart() {
    let inCart: Boolean;
    this.userService.isLoggedIn$.subscribe((user) => {
      this.loggedIn = user;
      if (this.loggedIn === true) {
        inCart = this.existsInCart();
        if (inCart === false) {
          this.wishlistService.addToCart(this.productId, 1);
          this.productIds.push(this.productId);
        }
      } else {
        this.route.navigate(['/profile']);
      }
    });
  }

  addToWishlist() {
    this.wishList.createWishList(this.product.id);
  }

  openProductDetail() {
    this.router.navigate(['shop/product', this.product.id]);
  }
}
