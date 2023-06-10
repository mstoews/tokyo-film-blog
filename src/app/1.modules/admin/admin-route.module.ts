import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ProductResolver } from 'app/4.services/product.resolver';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';

import { InventoryComponent } from './inventory-maintenance/inventory-grid.component';
import { InventoryImageSelectionComponent } from './inventory-maintenance/inventory-image-selection/inventory-image-selection.component';
import { ProductEditComponent } from './inventory-maintenance/product-edit/product-edit.component';
import { ImageMaintenanceComponent } from './image-maintenance/image-maintenance.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Administration',
    component: AdminShellComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    title: 'Administration',
    component: AdminFormComponent,
    data: { state: 'admin' },
  },
  {
    path: 'inventory',
    title: 'Product Maintenance',
    component: InventoryComponent,
    data: { state: 'inventory' },
  },
  {
    path: 'inventory/:id',
    title: 'Product Edit',
    component: ProductEditComponent,
    resolve: {
      product: ProductResolver,
    },
    data: { state: 'inventory/:id' },
  },
  {
    path: 'category',
    title: 'Category Maintenance',
    component: CategoryGridComponent,
    data: { state: 'category' },
  },

  {
    path: 'inventory-selection',
    pathMatch: 'full',
    component: InventoryImageSelectionComponent,
    data: { state: 'inventory-selection' },
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: ImageMaintenanceComponent,
    data: { state: 'gallery' },
  },
  {
    path: 'contact-grid',
    pathMatch: 'full',
    component: ContactListComponent,
    data: { state: 'contact-grid' },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminRouteModule],
})
export class AdminRouteModule {}
