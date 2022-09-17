import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { Routes, RouterModule } from '@angular/router';
import { MainShopComponent } from './main-shop/main-shop.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShopComponent,
  },
];



@NgModule({
  declarations: [
    ShopComponent,
    MainShopComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ShopModule { }
