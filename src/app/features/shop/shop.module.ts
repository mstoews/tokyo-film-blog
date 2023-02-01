import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShopComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { MainShopComponent } from './main-shop/shop.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { MaterialModule } from 'app/material.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from '../shared-module/shared.module';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsFiveComponent } from './product-details-five/product-details-five.component';
import { ProductResolver } from 'app/services/product.resolver';
import { SafePipe } from './safe.pipe';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { CartResolver } from 'app/services/cart.resolver';
import { WishListResolver } from 'app/services/wishlist.resolver';
import { HeaderComponent } from 'app/components/header/header.component';
import { NotificationComponent } from 'app/components/notification/notification.component';
import { PurchaseThankdComponent } from './thanks/purchase-thanks';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Shopping',
    component: MainShopComponent
  },
  {
    path: 'product/:id',
    title: 'Shopping Items',
    component: ProductDetailsFiveComponent,
    resolve: {
      product: ProductResolver
    },
    data: { state: 'product/:id' }
  },
  {
    path: 'cart/:id',
    title: 'Shopping Cart',
    component: CartComponent,
    resolve: { cart: CartResolver },
    data: { state: 'cart/:id' }
  },
  {
    path: 'wishlist/:id',
    pathMatch: 'full',
    title: 'Wish List',
    component: WishListComponent,
    resolve: {
      wishlist: WishListResolver
    },
    data: { state: 'wishlist/:id' }
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
  {
    path: 'purchase-thanks',
    pathMatch: 'full',
    title: 'Purchases',
    component: ComingSoonComponent,
    data: { state: 'purchase-thanks' }
  },
];

@NgModule({
  declarations: [
    ShopComponent,
    MainShopComponent,
    CartComponent,
    ShopCardComponent,
    ProductDetailsFiveComponent,
    StripeCheckoutComponent,
    SafePipe,
    ComingSoonComponent,
    WishListComponent,
    PurchaseThankdComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    FuseCardModule,
    SharedModule,
    NotificationComponent,
    RouterModule.forChild(routes),
    HeaderComponent
  ]
})
export class ShopModule { }
