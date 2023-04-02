import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'app/models/products'
import { Router } from '@angular/router'
import { WishListService } from 'app/services/wishlist.service'
import { UserService } from 'app/services/auth/user.service'

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css'],
})
export class ShopCardComponent implements OnInit {

  @Input() product: Product

  constructor(
    private router: Router,
    private userService: UserService,
    private wishList: WishListService) {}

  ngOnInit(): void {}

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
