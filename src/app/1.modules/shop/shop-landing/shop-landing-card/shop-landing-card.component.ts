import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/5.models/category';

@Component({
  selector: 'app-shop-landing-card',
  templateUrl: './shop-landing-card.component.html',
  styleUrls: ['./shop-landing-card.component.css']
})
export class ShopLandingCardComponent {
  @Input() category: Category;
  router = inject(Router);


  openShopByCategory() {
    
    this.router.navigate(['shop/category', this.category.name]);
  }
}
