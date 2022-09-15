import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { HighlightComponent } from './highlight/highlight.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
]

@NgModule({
  declarations: [ProductsComponent, HighlightComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:  [HighlightComponent]
})
export class ProductsModule { }
