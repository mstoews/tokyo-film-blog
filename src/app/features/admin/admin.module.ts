import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CreationsGridComponent } from './products-grid/products-grid.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { GridMenubarComponent } from './grid-menubar/grid-menubar.component';
import { GalleryLightboxModule } from '../gallery-lightbox/gallery-lighthouse.module';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxPopupModule,
} from 'devextreme-angular';
import { FuseCardModule } from '@fuse/components/card';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { ImageMaintenanceComponent } from './image-maintenance/image-maintenance.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { InventoryComponent } from './inventory-grid/inventory-grid.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { SafePipe } from './safe.pipe';
import { InventoryContentComponent } from './inventory-content/inventory-content.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SwiperModule } from 'swiper/angular';
import { IconsModule } from 'app/icons.module';
import { InventoryImageSelectionComponent } from './inventory-image-selection/inventory-image-selection.component';
import { BlogbarComponent } from './blog-grid/blogbar/blogbar.component';
import { ProductEditComponent } from './inventory-grid/product-edit/product-edit.component';
import { ProductResolver } from 'app/services/product.resolver';
import { HeaderComponent } from 'app/components/header/header.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { BlogResolver } from 'app/services/blog.resolver';
import { BlogEditComponent } from './blog-grid/blog-edit/blog-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Administration',
    component: AdminShellComponent,
  },
  {
    path: 'blog',
    pathMatch: 'full',
    title: 'Thoughts',
    component: BlogGridComponent,
    data: { state: 'blog' },
  },
  {
    path: 'blog/:id',
    title: 'Blog Edit',
    component: BlogEditComponent,
    resolve: {
      product: BlogResolver,
    },
    data: { state: 'inventory/:id' },
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
    title: 'Inventory Maintenance',
    component: InventoryComponent,
    data: { state: 'inventory' },
  },
  {
    path: 'category',
    title: 'Category Maintenance',
    component: CategoryGridComponent,
    data: { state: 'category' },
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
    path: 'inventory-selection',
    pathMatch: 'full',
    component: InventoryImageSelectionComponent,
    data: { state: 'inventory-selection' },
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: GalleryComponent,
    data: { state: 'gallery' },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    OrdersGridComponent,
    CreationsGridComponent,
    BlogGridComponent,
    GridMenubarComponent,
    CategoryGridComponent,
    ImageMaintenanceComponent,
    ImageCardComponent,
    CollectionCardComponent,
    ProductCardComponent,
    InventoryComponent,
    AdminFormComponent,
    GalleryComponent,
    ServicesComponent,
    ContactGridComponent,
    SafePipe,
    InventoryContentComponent,
    InventoryImageSelectionComponent,
    InventoryComponent,
    BlogbarComponent,
    ProductEditComponent,
    AdminShellComponent,
    BlogEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    NgImageSliderModule,
    RouterModule.forChild(routes),
    FuseCardModule,
    GalleryLightboxModule,
    DxPopupModule,
    DxHtmlEditorModule,
    SwiperModule,
    NgOptimizedImage,
    IconsModule,
    HeaderComponent,
  ],
  exports: [AdminComponent, OrdersGridComponent],
})
export class AdminModule {}
