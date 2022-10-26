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
    path: 'animation',
    loadChildren: () => import('./features/ui/animations/animations.module').then( (mod) => mod.AnimationsModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then( (mod) => mod.AdminModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'schedule',
    loadChildren: () => import('./features/schedule/schedule.module').then( (mod) => mod.ScheduleModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'images',
    loadChildren: () => import('./features/maintenance/maintenance.module').then((mod) => mod.MaintenanceModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },
   {
    path: 'pricing',
    loadChildren: () => import('./features/pages/pricing/modern/modern.module').then((mod) => mod.PricingModernModule),
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
