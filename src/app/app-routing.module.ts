import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authentication/split-screen/sign-in']);
const redirectLoggedInToHome = () => redirectUnauthorizedTo(['home']);

const routes: Route[] = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
   },
   { path: 'home',
      loadChildren: () => import('./features/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
   },
   {
    path: 'authentication',
    loadChildren: () => import('./features/pages/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
   },
   {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.module').then( (mod) => mod.ShopModule),
   },
   {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.module').then( (mod) => mod.BlogModule),
   },
   {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then( (mod) => mod.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'collections',
    loadChildren: () => import('./features/products/products.module').then( (mod) => mod.ProductsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'stripe-checkout',
    loadChildren: () => import('./features/stripe/stripe.module').then( (mod) => mod.StripeModule),
   },
   {
    path: '**',
    redirectTo: '/'
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
vdTTcs8PN5fyBKz3SXOKCl09hlF3 Murray
cW5vCsElpETTpUJgT6UEDRSxadq2 Cassie
webhook: we_1M0mE4G9uU7PPnpFKwemadcN,
*/
