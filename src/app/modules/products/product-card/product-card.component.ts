import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


  @Input() product: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddToBag() {
    throw new Error('Method not implemented.');
    }

  onQuickLook() {
      throw new Error('Method not implemented.');
    }

    onOpenShopDetails() {
      this.router.navigate(['shop/product', this.product.id]);
    }

}
