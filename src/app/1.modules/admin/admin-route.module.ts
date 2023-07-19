import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router'

import { ProductResolver } from 'app/4.services/product.resolver';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';

import { InventoryComponent } from './inventory-maintenance/inventory-grid.component';
import { InventoryImageSelectionComponent } from './inventory-maintenance/inventory-image-selection/inventory-image-selection.component';
import { ProductEditComponent } from './inventory-maintenance/product-edit/product-edit.component';
import { ImageMaintenanceComponent } from './image-maintenance/image-maintenance.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authentication/split-screen/sign-in']);
const redirectLoggedInToHome = () => redirectUnauthorizedTo(['home']);
const adminOnly = () => hasCustomClaim('admin');


const routes: Routes = [
  {
    path: '',redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'company',
    pathMatch: 'full',
    title: 'Administration',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
    component: AdminFormComponent,
  },
  {
    path: 'inventory',
    title: 'Product Maintenance',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
    component: InventoryComponent,
  },
  {
    path: 'inventory/:id',
    title: 'Product Edit',
    component: ProductEditComponent,
    resolve: {
      product: ProductResolver,
    },
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
  },
  {
    path: 'category',
    title: 'Category Maintenance',
    component: CategoryGridComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
  },

  {
    path: 'inventory-selection',
    pathMatch: 'full',
    component: InventoryImageSelectionComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: ImageMaintenanceComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
  },
  {
    path: 'contact-grid',
    pathMatch: 'full',
    component: ContactListComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly },
  },
  {
    path: '**',redirectTo: '/home', pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminRouteModule],
})
export class AdminRouteModule {}
