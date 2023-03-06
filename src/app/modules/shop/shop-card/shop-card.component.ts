import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'app/models/products'
import { Router } from '@angular/router'
import { WishListService } from 'app/services/wishlist.service'

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css'],
})
export class ShopCardComponent implements OnInit {

  @Input() product: Product

  constructor(private router: Router,
    private wishList: WishListService) {}

  ngOnInit(): void {}

  addToCart() {
    this.wishList.addToCart(this.product.id);
  }
  addToWishlist() {
    this.wishList.createWishList(this.product.id);
    }
    
  openCart() {
    this.router.navigate(['shop/product', this.product.id])
  }
}
