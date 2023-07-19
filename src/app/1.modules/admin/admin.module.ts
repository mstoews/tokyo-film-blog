import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CreationsGridComponent } from './products-grid/products-grid.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { MaterialModule } from 'app/material.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { GridMenubarComponent } from './grid-menubar/grid-menubar.component';
import { GalleryLightboxModule } from '../gallery-lightbox/gallery-lighthouse.module';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxPopupModule,
} from 'devextreme-angular';
import { FuseCardModule } from '@made-to/components/card';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { ImageMaintenanceComponent } from './image-maintenance/image-maintenance.component';
import { ImageCardComponent } from './image-card/image-card.component';

import { ProductCardComponent } from './product-card/product-card.component';
import { InventoryComponent } from './inventory-maintenance/inventory-grid.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { SafePipe } from './safe.pipe';

import { IconsModule } from 'app/icons.module';
import { InventoryImageSelectionComponent } from './inventory-maintenance/inventory-image-selection/inventory-image-selection.component';
import { ProductEditComponent } from './inventory-maintenance/product-edit/product-edit.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { BlogResolver } from 'app/4.services/blog.resolver';

import { AdminRouteModule } from './admin-route.module';
import { ProductResolver } from 'app/4.services/product.resolver';
import { AddComponentDialog } from './inventory-maintenance/add/add.component';
import { InventoryPreviewComponent } from './inventory-maintenance/inventory-preview/inventory-preview.component';
import { ImageMenubarComponent } from './image-maintenance/image-menubar/image-menubar.component';
import { ImageListComponent } from './image-list/image-list.component';
import { SharedModule } from '../shared-module/shared.module';
import { PolicyModule } from '../policy/policy.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { InventoryImageCardComponent } from './inventory-maintenance/inventory-image-card/inventory-image-card.component';
import { ViewImageItemComponent } from './inventory-maintenance/inventory-image-card/view-image-item/view-image-item.component';
import { ImageSelectionComponent } from './image-maintenance/products-image-selection/image-selection.component';
import { CollectionImageSelectionComponent } from './image-maintenance/collection-image-selection/collection-image-selection.component';
import { ThoughtsImageSelectionComponent } from './image-maintenance/thoughts-image-selection/thoughts-image-selection.component';
import { GalleryImageSelectionComponent } from './image-maintenance/gallery-image-selection/image-selection.component';
import { ImageMgtEditComponent } from './image-maintenance/image-edit/image-mgt-edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    OrdersGridComponent,
    CreationsGridComponent,
    GridMenubarComponent,
    CategoryGridComponent,
    ImageMaintenanceComponent,
    ImageCardComponent,
    ProductCardComponent,
    InventoryComponent,
    AdminFormComponent,
    GalleryComponent,
    ServicesComponent,
    SafePipe,
    InventoryImageSelectionComponent,
    InventoryComponent,
    ProductEditComponent,
    AdminShellComponent,
    AddComponentDialog,
    InventoryPreviewComponent,
    ImageMenubarComponent,
    ImageListComponent,
    ContactListComponent,
    InventoryImageCardComponent,
    ImageSelectionComponent,
    CollectionImageSelectionComponent,
    ThoughtsImageSelectionComponent,
    GalleryImageSelectionComponent,
    ImageMgtEditComponent,
  ],
  imports: [
    AdminRouteModule,
    CommonModule,
    MaterialModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    NgImageSliderModule,
    AdminRouteModule,
    FuseCardModule,
    GalleryLightboxModule,
    DxPopupModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    IconsModule,
    SharedModule,
    PolicyModule,
    ViewImageItemComponent
  ],
  exports: [AdminComponent, OrdersGridComponent],
  providers: [BlogResolver, ProductResolver],
})
export class AdminModule {}
