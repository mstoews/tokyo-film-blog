import { Component, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop',
  templateUrl:'./main-shop.component.html',
  styleUrls: ['./main-shop.component.css']
})
export class MainShopComponent implements OnInit {

  dropdown: boolean = false
  filters: boolean = false

  Products$: Observable<Product[]>;
  prd: any;
  sTitle = 'Inventory';

  constructor ( private readonly productService: ProductsService ) {
    this.sTitle = 'Product Inventory'

  }

  ngOnInit(): void {
    this.Products$ = this.productService.getAll();
  }

  showDropdown(){
    this.dropdown =! this.dropdown
  }

  filtershow(){
    this.filters =! this.filters
  }

}
