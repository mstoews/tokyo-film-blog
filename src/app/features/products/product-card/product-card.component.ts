import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'app/models/products/mt-Products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToBag() {
    throw new Error('Method not implemented.');
    }

  onQuickLook() {
      throw new Error('Method not implemented.');
    }

}
