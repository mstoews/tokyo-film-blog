import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable, Subscription } from 'rxjs';
import { WishListService } from 'app/services/wishlist.service';
import { CartService } from 'app/services/cart.service';
import { AuthService } from 'app/services/auth/auth.service';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { imageItem } from 'app/models/imageItem';
import { Cart } from 'app/models/cart';
import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'app/services/auth/user.service';

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
    private userService: UserService
  ) {}

  mainImage: string;
  productIds: string[] = [];
  wishListIds: string[] = [];
  loggedIn: boolean = false;

  userData: any;

  userId: String;

  ngOnInit(): void {
    this.userData = this.authService.userData;
    // console.log(JSON.stringify(this.userData));

    this.productIds = [];
    this.wishListIds = [];
    this.Categories$ = this.categories.getAll();

    this.product = this.activateRoute.snapshot.data['product'];
    this.productId = this.product.id;
    this.mainImage = this.product.image;
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
    this.inventoryImages$ = this.productService.getImageListByProduct(
      this.productId
    );
    this.menuToggleService.setCartListCount(this.productIds.length);
    this.menuToggleService.setWishListCount(this.wishListIds.length);
  }

  setImage(e: string) {
    this.mainImage = e;
  }

  existsInWishList(): boolean {
    let found = this.wishListIds.find((item) => {
      return item === this.productId;
    });
    if (found) {
      this.snackBar.open(
        'The item already exists in your wishlist ... ',
        'OK',
        { duration: 3000 }
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
      this.snackBar.open('The item already exists in your cart ... ', 'OK', {
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
          this.wishlistService.addToCart(this.productId);
          this.productIds.push(this.productId);
        }
      } else {
        this.route.navigate(['/profile']);
      }
    });
  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {
    if (this.cartCount > 0) {
      this.route.navigate(['shop/cart', this.authService.userData.uid]);
    } else {
      this.snackBar.open('There are no items in your cart', 'OK', {
        duration: 3000,
      });
      return;
    }
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
