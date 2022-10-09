import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { GridAGModule } from '../grid/gridAG.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/MaterialModule';
import { GridMenubarComponent } from './grid-menubar/menubar.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';



const routes: Routes = [
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: AdminComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent,
  },
];


@NgModule({
  declarations: [
    AdminComponent,
    OrdersGridComponent,
    ProductsGridComponent,
    GridMenubarComponent,
    BlogGridComponent,
  ],
  imports: [
    CommonModule,
    GridAGModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    GridMenubarComponent,
    AdminComponent,
    OrdersGridComponent,
    
  ],
})
export class AdminModule { }
