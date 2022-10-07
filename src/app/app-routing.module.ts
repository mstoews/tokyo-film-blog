import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Route[] = [
   {
    path: 'home',
      loadChildren: () => import('./modules/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
   },
   {
    path: 'authentication',
    loadChildren: () => import('./modules/pages/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
   },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
   },
   {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then( (mod) => mod.AdminModule),
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then( (mod) => mod.ProductsModule),
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.module').then( (mod) => mod.ShopModule),
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'home',
    loadChildren: () => import('./modules/shop/shop.module').then( (mod) => mod.ShopModule),
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then( (mod) => mod.BlogModule),
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'login',
    redirectTo: 'authentication',
    pathMatch: 'full',
   },
   {
    path: 'animation',
    loadChildren: () => import('./modules/ui/animations/animations.module').then( (mod) => mod.AnimationsModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'cards',
    loadChildren: () => import('./modules/ui/cards/cards.module').then( (mod) => mod.CardsModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
   },
   {
    path: 'image-design',
    loadChildren: () => import('./modules/ui/advanced-search/advanced-search.module').then((mod) => mod.AdvancedSearchModule),
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
