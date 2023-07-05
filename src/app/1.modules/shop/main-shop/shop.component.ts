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
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainShopComponent implements OnInit {
  categories: Category[]=[];
  products: Product[]=[];
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
    private readonly categoryService: CategoryService,
    private actRoute: ActivatedRoute,
    private snack: MatSnackBar
  ) {


  }

  ngxSpinner = inject(NgxSpinnerService);

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

  onRefreshName(category: string) {
    //this.showSpinner();
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
    //this.showSpinner();
    this.Category$ = this.categoryService.getAll();
    this.sTitle = 'Shop';
    this.currentCategory = 'Shawls';
    // this.actRoute.data.subscribe(data => {
    //   this.Products$ = of(data.shop);
    // })
    this.onRefreshName(this.currentCategory);
  }
}
