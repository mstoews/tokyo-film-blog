import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { Routes, RouterModule } from '@angular/router';
import { MainShopComponent } from './main-shop/main-shop.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { MaterialModule } from 'app/material.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '../shared-module/shared.module';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsFiveComponent } from './product-details-five/product-details-five.component';
import { ProductResolver } from 'app/services/product.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Shopping',
    component: ShopComponent,
  },
  {
    path: 'cart/:id',
    pathMatch: 'full',
    title: 'Shopping Cart',
    component: ProductDetailsFiveComponent,
    resolve: {
      product: ProductResolver
    }
  },
];

@NgModule({
  declarations: [
    ShopComponent,
    MainShopComponent,
    CartComponent,
    ShopCardComponent,
    ProductDetailsComponent,
    ProductDetailsFiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FuseCardModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ShopModule { }
