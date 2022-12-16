import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'app/models/products'
import { Router } from '@angular/router'

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css'],
})
export class ShopCardComponent implements OnInit {
  @Input() product: Product

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openCart() {
    // console.log('Open cart');
    this.router.navigate(['shop/product', this.product.id])
  }
}
