import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'app/models/products'
import { Router } from '@angular/router'
import { WishListService } from 'app/services/wishlist.service'
import { UserService } from 'app/services/auth/user.service'
import { Category } from 'app/models/category'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'app/services/auth/auth.service'
import { CartService } from 'app/services/cart.service'

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css'],
})
export class ShopCardComponent implements OnInit {

  @Input() product: Product
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
    private wishList: WishListService) {}

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
    this.userService.isLoggedIn$.subscribe( user => {
      if (user === true)
      {
        this.wishList.addToCart(this.product.id);
      }
      else {
        this.router.navigate(['/profile']);
      }
    })
   
  }
  addToWishlist() {
    this.wishList.createWishList(this.product.id);
    }
    
  openProductDetail() {
    this.router.navigate(['shop/product', this.product.id]);
  }
}
