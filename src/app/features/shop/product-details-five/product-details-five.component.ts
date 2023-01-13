import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { first, map, Observable, Subscription } from 'rxjs';
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

  inventoryImages$: Observable<imageItem[]>;
  imagesList: string[];
  cart: Observable<Cart[]>;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private wishlistService: WishListService,
    private productService: ProductsService,
    private cartService: CartService,
    private categories: CategoryService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore
  ) {}

  mainImage: string;
  productIds: string[] = [];
  wishListIds: string[] = [];

  ngOnInit(): void {

    this.wishListIds = [];
    this.productIds = [];
    this.Categories$ = this.categories.getAll();



    this.sub = this.activateRoute.params.subscribe((params) => {
      const prd = this.productService.findProductByUrl(params['id']);
      if (prd) {
        this.productItem$ = prd;
        this.productId = params['id'];
      }
    });


    this.productItem$.subscribe(productItem => {
      this.mainImage = productItem.image;
    })

    this.cartService
      .cartByUserId(this.authService.userData.uid)
      .subscribe((cart) => {
        this.cartCount = cart.length;
        cart.forEach((item) => {
          this.productIds.push(item.product_id);
        });
        console.log('Number of items in the cart: ', this.productIds.length);
      });

    this.wishlistService
      .wishListByUserId(this.authService.userData.uid)
      .subscribe((wishlist) => {
        this.cartCount = wishlist.length;
        wishlist.forEach((item) => {
          this.wishListIds.push(item.product_id);
        });
        console.log(
          'Number of items in the wishlist: ',
          this.wishListIds.length
        );
      });

    // this.inventoryImages$ = this.productService.getProductImage(this.productId);
    this.inventoryImages$ = this.productService.getImageListByProduct(this.productId);


  }

  setImage(e: string) {
    this.mainImage = e;
  }

  onAddToWishList() {
    const found = this.wishListIds.find((item) => {
      return item === this.productId;
    });
    if (found) {
      this.snackBar.open(
        'The item already exists in your wishlist ... ',
        'Close'
      );
      return;
    } else {
      this.wishlistService.createWishList(this.productId);
      this.wishListIds.push(this.productId);
    }
  }

  onAddToShoppingCart() {
    const found = this.productIds.find((item) => {
      return item === this.productId;
    });
    if (found) {
      this.snackBar.open('The item already exists in your cart ... ', 'Close');
      return;
    } else {
      this.wishlistService.addToCart(this.productId);
    }
  }

  onContinueShopping() {
    this.route.navigate(['/shop']);
  }

  onGoShoppingCart() {
    if (this.cartCount > 0) {
      this.route.navigate(['shop/cart', this.authService.userData.uid]);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
