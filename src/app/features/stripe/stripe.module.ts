import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Shopping',
    component: StripeCheckoutComponent,
  }
]

@NgModule({
  declarations: [
    StripeCheckoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StripeModule { }
