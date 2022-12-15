import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShopComponent } from './shop.component';
import { Routes, RouterModule } from '@angular/router';
import { MainShopComponent } from './main-shop/main-shop.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { MaterialModule } from 'app/material.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '../shared-module/shared.module';
import { ShoppingCartComponent } from './cart/cart.component';
import { ProductDetailsFiveComponent } from './product-details-five/product-details-five.component';
import { ProductResolver } from 'app/services/product.resolver';
import { SafePipe } from './safe.pipe';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Shopping',
    component: MainShopComponent
  },
  {
    path: 'cart/:id',
    pathMatch: 'full',
    title: 'Shopping Items',
    component: ProductDetailsFiveComponent,
    resolve: {
      product: ProductResolver
    },
    data: { state: 'cart/:id' }
  },
  {
    path: 'payment',
    pathMatch: 'full',
    title: 'Shopping Cart',
    component: ShoppingCartComponent,
    data: { state: 'payment' }
  },
  {
    path: 'stripe-checkout',
    pathMatch: 'full',
    title: 'Stripe Checkout',
    component: StripeCheckoutComponent,
    data: { state: 'stripe-checkout' }
  },
  {
    path: 'coming-soon',
    pathMatch: 'full',
    title: 'Coming in January',
    component: ComingSoonComponent,
    data: { state: 'coming-soon' }
  },
];

@NgModule({
  declarations: [
    ShopComponent,
    MainShopComponent,
    ShoppingCartComponent,
    ShopCardComponent,
    ProductDetailsFiveComponent,
    StripeCheckoutComponent,
    SafePipe,
    ComingSoonComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    FuseCardModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ShopModule { }
