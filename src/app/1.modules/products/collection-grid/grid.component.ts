import {
  Component,
  OnInit,
  OnDestroy,
  ɵconvertToBitFlags,
  inject,
} from '@angular/core';
import { Product } from 'app/5.models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/4.services/products.service';
import { map, Observable, Subscription } from 'rxjs';
import { WishListService } from 'app/4.services/wishlist.service';

import { CartService } from 'app/4.services/cart.service';
import { AuthService } from 'app/4.services/auth/auth.service';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { imageItem } from 'app/5.models/imageItem';
import { Cart } from 'app/5.models/cart';

import { MenuToggleService } from 'app/4.services/menu-toggle.service';
import { UserService } from 'app/4.services/auth/user.service';
import { ImageListService } from 'app/4.services/image-list.service';

@Component({
  selector: 'collection-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class CollectionGrid implements OnInit, OnDestroy {
  purchaseStarted: boolean;
  product$: Observable<Product | undefined>;
  productId: string;
  Products$: Observable<Product[]>;
  Categories$: Observable<Category[]>;
  sub: Subscription;
  cartCount = 0;
  wishListCount = 0;
  product: Product;
  isLoggedIn$: Observable<boolean>;
  imageListService = inject(ImageListService);
  images$: Observable<imageItem[]>;


  inventoryImages$: Observable<imageItem[]>;
  imagesList: string[];
  cart: Observable<Cart[]>;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private wishlistService: WishListService,
    private productService: ProductsService,
    private cartService: CartService,
    private categories: CategoryService,
    private snackBar: MatSnackBar,
    private menuToggleService: MenuToggleService,
    public userService: UserService
  ) {}

  mainImage: string;
  productIds: string[] = [];
  wishListIds: string[] = [];
  loggedIn: boolean = false;
  userData: any;
  userId: String;

  ngOnInit(): void {
    this.images$ = this.imageListService.getImagesByType('1');
    this.Products$ = this.productService
      .getAll()
      .pipe(
        map((inventory) =>
          inventory.filter((available) => available.is_featured === 'Featured')
        )
      );

    this.userData = this.authService.userData;
    this.wishListIds = [];
    this.productIds = [];
    this.Categories$ = this.categories.getAll();
    this.userService.isLoggedIn$.subscribe((access) => {
      this.loggedIn = access;
    });

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
    this.inventoryImages$ = this.productService.getImageListByProduct(
      this.productId
    );
    this.menuToggleService.setCartListCount(this.productIds.length);
    this.menuToggleService.setWishListCount(this.wishListIds.length);
  }

  setImage(e: string) {}

  onAddToWishList() {
    if (this.loggedIn === true) {
      const found = this.wishListIds.find((item) => {
        return item === this.productId;
      });
      if (found) {
        this.snackBar.open(
          'The item already exists in your wishlist ... ',
          'OK',
          { duration: 3000 }
        );
        return;
      } else {
        this.wishlistService.createWishList(this.productId);
        this.wishListIds.push(this.productId);
      }
    } else {
      this.route.navigate(['shop/coming-soon']);
    }
  }

  onAddToShoppingCart() {
    if (this.loggedIn === true) {
      const found = this.productIds.find((item) => {
        return item === this.productId;
      });
      if (found) {
        this.snackBar.open(
          'The item already exists in your cart ... ',
          'Close',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-danger',
          }
        );
        return;
      } else {
        this.wishlistService.addToCart(this.productId, 1);
      }
    } else {
      this.route.navigate(['shop/coming-soon']);
    }
  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {
    const userId = this.authService.userData.uid;
    // console.log('got to checkout ', userId);
    if (this.authService.userData.uid !== undefined) {
      if (this.cartCount > 0) {
        this.route.navigate(['shop/cart', userId]);
      } else {
        this.snackBar.open('There are no items in your cart', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
        });
        return;
      }
    } else {
      this.snackBar.open('You must be logged in access the cart', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
      });
      this.snackBar._openedSnackBarRef!.onAction().subscribe();
    }
    this.route.navigate(['shop/coming-soon']);
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
