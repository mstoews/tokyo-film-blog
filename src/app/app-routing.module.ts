import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LandingPage2Component } from './modules/landing-page/landing-page2.component';

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
        // canActivate: [AuthGuard],
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
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then( (mod) => mod.ProductsModule),
  },
  // {
  //   path: 'blog',
  //   loadChildren: () => import('./modules/blog/blog.module').then((mod) => mod.BlogModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
