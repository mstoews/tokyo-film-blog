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
import { InventoryImageSelectionComponent } from './inventory-grid/inventory-image-selection/inventory-image-selection.component';
import { ProductEditComponent } from './inventory-grid/product-edit/product-edit.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { BlogResolver } from 'app/services/blog.resolver';

import { AdminRouteModule } from './admin-route.module';
import { ProductResolver } from 'app/services/product.resolver';
import { AddComponentDialog } from './inventory-grid/add/add.component';
import { InventoryPreviewComponent } from './inventory-grid/inventory-preview/inventory-preview.component';
import { ImageMenubarComponent } from './image-maintenance/image-menubar/image-menubar.component';
import { ImageListComponent } from "./image-list/image-list.component";


@NgModule({
  declarations: [
    AdminComponent,
    OrdersGridComponent,
    CreationsGridComponent,
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

    ProductEditComponent,
    AdminShellComponent,
    AddComponentDialog,
    InventoryPreviewComponent,
    ImageMenubarComponent,
    ImageListComponent

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
    SwiperModule,
    NgOptimizedImage,
    IconsModule,
    HeaderComponent,

  ],
  exports: [AdminComponent, OrdersGridComponent],
  providers: [BlogResolver, ProductResolver],
})
export class AdminModule {}
