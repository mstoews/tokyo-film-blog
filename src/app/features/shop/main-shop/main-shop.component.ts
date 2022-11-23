import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-shop',
  templateUrl:'./main-shop.component.html',
  styleUrls: ['./main-shop.component.css']
})
export class MainShopComponent implements OnInit {

  categories: any;
  dropdown: boolean = false
  filters: boolean = false

  Products$: Observable<Product[]>;
  prd: any;
  sTitle = 'Inventory';

  constructor (
    private route: Router,
    private readonly productService: ProductsService,
    private readonly categoryService: CategoryService ) {
    this.categories = categoryService.getAll();
    this.sTitle = 'Product Inventory'

  }

  backToHome() {
    this.route.navigate(['home']);
   }


  changeCategory(arg0: any) {
    throw new Error('Method not implemented.');
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
