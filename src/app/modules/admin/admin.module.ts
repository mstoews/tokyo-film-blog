import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { GridAGModule } from '../grid/gridAG.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/MaterialModule';
import { GridMenubarComponent } from './grid-menubar/menubar.component';
import { ProductsFormComponent } from './products-form/products.form';

const routes: Routes = [
  {
    path: 'landing',
    pathMatch: 'full',
    component: OrdersGridComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: OrdersGridComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: OrdersGridComponent,
  },
];


@NgModule({
  declarations: [
    AdminComponent,
    OrdersGridComponent,
    ProductsFormComponent,
    ProductsGridComponent,
    GridMenubarComponent,
  ],
  imports: [
    CommonModule,
    GridAGModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
