import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authentication/split-screen/sign-in']);
const redirectLoggedInToHome = () => redirectUnauthorizedTo(['home']);

const routes: Route[] = [
   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
   },
   { path: 'home',
      loadChildren: () => import('./features/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
      data: { state: 'home' }
   },
   {
    path: 'authentication',
    loadChildren: () => import('./features/pages/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
    data: { state: 'authenication' }
   },
   {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.module').then( (mod) => mod.ShopModule),
    data: { state: 'shop' }
   },
   {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.module').then( (mod) => mod.BlogModule),
    data: { state: 'blog' }
   },
   {
    path: 'blog-admin',
    loadChildren: () => import('./features/blog-admin/blog-admin.module').then( (mod) => mod.BlogAdminModule),
    data: { state: 'blog-admin' }
   },

   {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then( (mod) => mod.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome, state: 'admin'  }
   },
   {
    path: 'collections',
    loadChildren: () => import('./features/products/products.module').then( (mod) => mod.ProductsModule),
   },
   {
    path: 'stripe-checkout',
    loadChildren: () => import('./features/stripe/stripe.module').then( (mod) => mod.StripeModule),
    data: { state: 'strip-checkout' }
   },
   {
    path: 'profile',
    loadChildren: () => import('./features/pages/profile/profile.module').then( (mod) => mod.ProfileModule),
    data: { state: 'profile' }
   },
   {
    path: '**',
    redirectTo: '/home'
    // Maybe create a page not found component page instead of just going to the 'home'
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
