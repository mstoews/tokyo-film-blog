import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { HighlightComponent } from './highlight/highlight.component';
import { BannerComponent } from './banner/banner.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DetailsComponent } from './details/details.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { CarourselsComponent } from './caroursels/caroursels.component';
import { GridComponent } from './collection-grid/grid.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'carousel',
    component: CarouselComponent,
  },
]

@NgModule({
  declarations: [ProductsComponent, HighlightComponent, BannerComponent, ShoppingCartComponent, DetailsComponent, CategoriesComponent, OrderSummaryComponent, QuickViewComponent, CarourselsComponent, GridComponent, CarouselComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:  [HighlightComponent]
})
export class ProductsModule { }
