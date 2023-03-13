import {
  Component,
  OnInit,
  OnDestroy,
  ɵconvertToBitFlags,
} from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable, Subscription } from 'rxjs';
import { WishListService } from 'app/services/wishlist.service';
import { CheckoutService } from 'app/services/checkout.service';
import { CartService } from 'app/services/cart.service';
import { AuthService } from 'app/services/auth/auth.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { imageItem } from 'app/models/imageItem';
import { Cart } from 'app/models/cart';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css'],
})
export class ProductDetailsFiveComponent implements OnInit, OnDestroy {
  purchaseStarted: boolean;
  productItem$: Observable<Product | undefined>;
  productId: string;
  Products$: Observable<Product[]>;
  Categories$: Observable<Category[]>;
  sub: Subscription;
  cartCount = 0;
  wishListCount = 0;
  product: Product;
  isLoggedIn$: Observable<boolean>;

  inventoryImages$: Observable<imageItem[]>;
  imagesList: string[];
  cart: Observable<Cart[]>;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    public authService: AuthService,
    private wishlistService: WishListService,
    private productService: ProductsService,
    private cartService: CartService,
    private categories: CategoryService,
    private snackBar: MatSnackBar,
    private menuToggleService: MenuToggleService,
    private afAuth: AngularFireAuth
  ) {}

  mainImage: string;
  productIds: string[] = [];
  wishListIds: string[] = [];
  loggedIn: boolean = false;

  userData: any;

  userId: String;

  ngOnInit(): void {
    this.userData = this.authService.userData;
    console.log(JSON.stringify(this.userData));

    this.productIds = [];
    this.Categories$ = this.categories.getAll();
    this.authService.getAuth().subscribe((access) => {
      this.loggedIn = access;
    });

    this.afAuth.authState

    this.product = this.activateRoute.snapshot.data['product'];
    this.productId = this.product.id;
    this.mainImage = this.product.image;
    console.log('User id from cart', this.authService.userData.uid);

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

  setImage(e: string) {
    this.mainImage = e;
  }

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
        this.snackBar.open('The item already exists in your cart ... ', 'OK', {
          duration: 3000,
        });
        return;
      } else {
        this.wishlistService.addToCart(this.productId);
      }
    } else {
      this.route.navigate(['shop/coming-soon']);
    }

  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {

      if (this.cartCount > 0) {
        this.route.navigate(['shop/cart', this.authService.userData.uid ]);
      } else {
        this.snackBar.open('There are no items in your cart', 'OK', {
          duration: 3000,
        });
        return;
      }
    // } else {
    //   this.snackBar.open('You must be logged in access the cart', 'OK', {
    //     duration: 3000,
    //   });
    //   this.snackBar._openedSnackBarRef!.onAction().subscribe();
    // }
    // this.route.navigate(['shop/coming-soon']);
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
