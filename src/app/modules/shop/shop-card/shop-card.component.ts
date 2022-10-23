import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'app/models/products/mt-Products';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {

  }

}
