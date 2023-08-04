import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Route, Router, TitleStrategy } from '@angular/router';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, Subscription, of } from 'rxjs';
import { Category } from 'app/5.models/category';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShopComponent implements OnInit, OnDestroy {

  Products$: Observable<Product[]>;
  category: Category[] = [];
  currentCategory: string;
  sTitle: string;
  sub: Subscription;
  loading = false;

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private productService: ProductsService,
    private categoryService: CategoryService,

  ) {}

  Category$ = this.categoryService.getAll();

  mobile = true;

  openProductDetail(productId: string) {
    this.route.navigate(['shop/product', productId]);
  }

  backToHome() {
    this.route.navigate(['home']);
  }

  updateCategory(e: any) {
    this.onRefreshName(e);
  }

  onRefreshName(category: string) {
    this.currentCategory = category;
    this.Products$ = this.productService.getInventoryByCategory(category);
  }


  selectCategory(index: any) {
    if (index.index >= 0) {
      const category = this.categoryService.getAll();
      this.sub = category.subscribe((data) => {
        this.onRefreshName(data[index.index].name);
      });
    }
  }

  ngOnInit(): void {
    this.sTitle = 'Shop';
    this.actRoute.data.subscribe((data) => {
      if (data.length > 0) {
        this.currentCategory = data.shop[0].category;
      }
      else {
        this.currentCategory = '';
      }
      this.Products$ = of(data.shop);
    });

    if (window.screen.width <= 768) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
