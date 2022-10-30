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


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShopComponent,
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent
  },
];

@NgModule({
  declarations: [
    ShopComponent,
    MainShopComponent,
    CartComponent,
    ShopCardComponent
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
