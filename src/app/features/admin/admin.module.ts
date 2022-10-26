import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/MaterialModule';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { GridMenubarComponent } from './grid-menubar/grid-menubar.component';

import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,

} from 'devextreme-angular';



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
    BlogGridComponent,
    GridMenubarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    NgImageSliderModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    AdminComponent,
    OrdersGridComponent,
  ],
})
export class AdminModule { }
