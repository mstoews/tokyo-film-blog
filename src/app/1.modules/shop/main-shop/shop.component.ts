import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShopComponent implements OnInit {

  ngxSpinner = inject(NgxSpinnerService);
  route = inject(Router);
  productService= inject( ProductsService);
  categoryService= inject( CategoryService);
  actRoute= inject( ActivatedRoute);
  snack= inject( MatSnackBar);

  categories: Category[]=[];
  products: Product[]=[];
  Category$: Observable<Category[]>;
  Products$: Observable<Product[]>;

  currentCategory: string;
  sTitle: string;
  myVar: any;


  showSpinner() {
    this.ngxSpinner.show();
    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 1500);
  }

  backToHome() {
    this.route.navigate(['home']);
  }

  updateCategory(e: any) {
    this.onRefreshName(e);
  }


  startTimer() {
    this.myVar = setTimeout(function(){ window.location.reload(); }, 10000);
  }
  
  myStopFunction() {
    clearTimeout(this.myVar);
  }

  onRefreshName(category: string) {
    this.showSpinner();
    this.currentCategory = category;
    this.Products$ = this.productService.getInventoryByCategory(category);
    this.snack.open('Updating category ...', 'OK', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
    });
  }

  ngOnInit(): void {
    
    this.showSpinner();
    this.Category$ = this.categoryService.getAll();
    this.sTitle = 'Shop';
    this.currentCategory = 'Shawls';
    this.actRoute.data.subscribe(data => {
       this.Products$ = of(data.shop);
    });
    
  }
}
