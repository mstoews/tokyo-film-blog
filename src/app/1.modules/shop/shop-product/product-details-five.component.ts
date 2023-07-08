import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'app/5.models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, Subscription } from 'rxjs';
import { WishListService } from 'app/4.services/wishlist.service';
import { CartService } from 'app/4.services/cart.service';
import { AuthService } from 'app/4.services/auth/auth.service';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { imageItem } from 'app/5.models/imageItem';
import { Cart } from 'app/5.models/cart';
import { MenuToggleService } from 'app/4.services/menu-toggle.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'app/4.services/auth/user.service';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  quantity: number = 1.0;
  total_cost: number = 0.0;

  userData: any;

  userId: String;

  ngOnInit(): void {
    this.userData = this.authService.userData;
    // console.log(JSON.stringify(this.userData));

    this.productIds = [];
    this.wishListIds = [];
    this.Categories$ = this.categories.getAll();

    this.product = this.activateRoute.snapshot.data['product'];
    if (this.product.quantity == undefined) {
      this.quantity = 1;
    } else {
      this.quantity = this.product.quantity;
      this.total_cost = this.product.price * this.quantity;
    }

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

  add() {
    let quantity_increment: number;
    let quantity: number;
    if (this.product.quantity_increment) {
      quantity_increment = +this.round(this.product.quantity_increment, 1);
    }

    quantity = +this.round(this.quantity, 1);

    this.quantity = this.round(quantity, 1) + this.round(quantity_increment, 1);
    this.total_cost = this.product.price * this.quantity;

    //('quantity', this.quantity);
  }

  subtract() {
    let quantity_increment: number;
    let quantity: number;
    if (this.product.quantity_increment) {
      quantity_increment = +this.product.quantity_increment;
    }

    quantity = +this.quantity;

    this.quantity = this.round(quantity, 1) - this.round(quantity_increment, 1);

    this.total_cost = this.product.price * this.quantity;

    console.log(
      `quantity  ${this.product.quantity} ${this.quantity} ${this.product.quantity_increment} ${quantity_increment} ${this.total_cost}`
    );
  }

  round(number: number, precision: number) {
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    } else
      return +(
        Math.round(Number(number + 'e+' + precision)) +
        'e-' +
        precision
      );
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
          duration: 3000,
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
          this.wishlistService.addToCart(this.productId, this.quantity);
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
      this.snackBar.open('There are no items in your cart', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
        duration: 3000,
      });
      return;
    }
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}