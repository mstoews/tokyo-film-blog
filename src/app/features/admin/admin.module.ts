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
import { DxDataGridModule, DxBulletModule,  DxTemplateModule, DxPopupModule} from 'devextreme-angular';
import { FuseCardModule } from '@fuse/components/card';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { ImageMaintenanceComponent } from './image-maintenance/image-maintenance.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { InventoryComponent } from './inventory-grid/inventory-grid.component'
import { AdminFormComponent } from './admin-form/admin-form.component';
import { DxHtmlEditorModule  } from 'devextreme-angular';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { SafePipe } from './safe.pipe';
import { InventoryContentComponent } from './inventory-content/inventory-content.component';
import { SwiperModule } from 'swiper/angular';
import { IconsModule } from 'app/icons.module';

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

    SafePipe,
    InventoryContentComponent,

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
    IconsModule
  ],
  exports: [
    AdminComponent,
    OrdersGridComponent,
  ],
})
export class AdminModule { }
