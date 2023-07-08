import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Route, Router, TitleStrategy } from '@angular/router';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, Subscribable, Subscription, of } from 'rxjs';
import { Category } from 'app/5.models/category';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShopComponent implements OnInit, OnDestroy {
  route = inject(Router);
  productService = inject(ProductsService);
  categoryService = inject(CategoryService);
  actRoute = inject(ActivatedRoute);
  Products$: Observable<Product[]>;
  category: Category[] = [];
  currentCategory: string;
  sTitle: string;
  sub: Subscription;
  loading = false;

  Category$ = this.categoryService.getAll();

  mobile = true;

  backToHome() {
    this.route.navigate(['home']);
  }

  updateCategory(e: any) {
    this.onRefreshName(e);
  }

  onRefreshName(category: string) {
    this.setLoading();
    this.currentCategory = category;
    this.Products$ = this.productService.getInventoryByCategory(category);
  }

  setLoading() {
    this.loading = true;
    setTimeout(()=> {
      this.loading = false;
    }, 2000);
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
    this.setLoading();
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