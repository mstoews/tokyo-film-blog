import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { ProductsService } from 'app/4.services/products.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'shop',
  templateUrl: './shop-landing.component.html',
  styleUrls: ['./shop-landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopLandingComponent implements OnInit {
  Category$: Observable<Category[]>;
  route = inject(Router);
  categoryService = inject(CategoryService);
  sTitle = 'Made To Shopping Categories';
  ngxSpinner = inject(NgxSpinnerService);

  constructor() {

  }

  showSpinner() {
    this.ngxSpinner.show();
    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 1000);
  }

  backToHome() {
    this.route.navigate(['home']);
  }

  ngOnInit(): void {
    this.showSpinner();
    this.Category$ = this.categoryService.getAll();
  }
}
