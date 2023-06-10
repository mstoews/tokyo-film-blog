import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { HighlightComponent } from '../landing-page/highlight/highlight.component';
import { BannerComponent } from './banner/banner.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { GridComponent } from './collection-grid/grid.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from 'app/material.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '../shared-module/shared.module';
import { SafePipe } from './safe.pipe';
import { HeaderComponent } from 'app/2.main/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  declarations: [
    SafePipe,
    ProductsComponent,
    BannerComponent,
    OrderSummaryComponent,
    GridComponent,
    CarouselComponent,
    ProductCardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FuseCardModule,
    SharedModule,
    NgOptimizedImage,
  ],
})
export class ProductsModule {}
