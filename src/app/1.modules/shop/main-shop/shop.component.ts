import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { ProductsService } from 'app/4.services/products.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShopComponent implements OnInit {
  categories: Category[];
  Category$: Observable<Category[]>;
  Products$: Observable<Product[]>;
  dropdown: boolean = false;
  filters: boolean = false;
  currentCategory: string;

  prd: any;
  sTitle: string;

  constructor(
    private route: Router,
    private readonly productService: ProductsService,
    private readonly categoryService: CategoryService
  ) {
    this.Category$ = categoryService.getAll();
    this.sTitle = 'Shop';
  }

  backToHome() {
    this.route.navigate(['home']);
  }

  onRefreshName(category: string) {
    this.currentCategory = category;
    this.Products$ = this.productService.getFilteredInventory(category);
  }

  changeCategory(category: string) {}

  ngOnInit(): void {
    this.Category$ = this.categoryService.getAll();
    this.Category$.subscribe((result) => {
      this.categories = result;
      this.currentCategory = 'All Categories';
      this.Products$ = this.productService.getFilteredInventory(
        this.currentCategory
      );
    });
  }
}
