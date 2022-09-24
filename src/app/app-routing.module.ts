import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from './modules/users/user/auth.guard';

const routes: Route[] = [
  // {
  //   path: 'authenication/sign-in/classic',
  //   loadChildren: () => import('./modules/pages/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
  // },
  //  {
  //   path: 'home',
  //     loadChildren: () => import('./modules/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
  //  },
   {
    path: 'home',
      loadChildren: () => import('./modules/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
        // component: LandingPage2Component,
      /// canActivate: [AuthGuard],
      canActivate: [AuthGuard],
   },
   {
    path: 'authentication',
    loadChildren: () => import('./modules/pages/authentication/authentication.module')
                            .then((mod) => mod.AuthenticationModule),
  },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then( (mod) => mod.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.module').then( (mod) => mod.ShopModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/shop/shop.module').then( (mod) => mod.ShopModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then( (mod) => mod.BlogModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    redirectTo: 'authentication',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'animation',
    loadChildren: () => import('./modules/ui/animations/animations.module').then( (mod) => mod.AnimationsModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'cards',
    loadChildren: () => import('./modules/ui/cards/cards.module').then( (mod) => mod.CardsModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
