import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'app/4.services/category.service';


@Component({
  selector: 'shop',
  templateUrl: './shop-landing.component.html',
  styleUrls: ['./shop-landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopLandingComponent  {
  constructor(
    private route: Router,
    private categoryService: CategoryService
  ) {}
  
  sTitle = 'Made To Shopping By Categories';

  Category$ = this.categoryService.getAll();

  
  backToHome() {
    this.route.navigate(['home']);
  }

}
