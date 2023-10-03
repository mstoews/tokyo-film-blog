import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { IconsModule } from 'app/icons.module';
import { CollectionsEditRoutingModule } from './collections-routing.module';
import { CollectionsEditComponent } from './admin/collection-edit/collections-edit.component';
import { CollectionsImageSelectionComponent } from './admin/collections-image-selection/collections-image-selection.component';
import { SharedModule } from '../shared-module/shared.module';
import { CollectionsAddDialog } from './admin/add/collections-add.component';
import { CollectionResolver } from 'app/4.services/collection.resolver';
import { CollectionsDetailsAddDialog } from './admin/collections-details-add/collections-details-add.component';
import { CollectionsAdminComponent } from './admin/collection-grid/collections-grid.component';
import { CollectionsDetailsGridComponent } from './admin/collection-details/collections-details-grid.component';
import { CollectionPreviewComponent } from './admin/collection-preview/collection-preview.component';
import { CollectionImageCardComponent } from './admin/collection-image-card/collection-image-card.component';
import { ImageMaintenanceModule } from '../admin/image-maintenance/image-maintenance.module';
import { CollectionMainComponent } from './collection-page/collection-main.component';
import { CollectionPage } from './collection-page/collection-page/collection-page.component';
import { ProductCardComponent } from './collection-page/product-card/product-card.component';
import { GalleryLightboxModule } from '../gallery-lightbox/gallery-lighthouse.module';
import { CollectionGalleryComponent } from './collection-page/collection-gallery/gallery.component';
import { SafePipe } from './safe.pipe';
import { CollectionImagesComponent } from './collection-page/collection-gallery/collection-images.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { GalleryModule, Gallery, GalleryItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

@NgModule({
    declarations: [
        CollectionsEditComponent,
        CollectionsAdminComponent,
        CollectionsImageSelectionComponent,
        CollectionsAddDialog,
        CollectionsDetailsAddDialog,
        CollectionsDetailsGridComponent,
        CollectionPreviewComponent,
        CollectionImageCardComponent,
        CollectionMainComponent,
        CollectionPage,
        ProductCardComponent,
        CollectionImagesComponent,
        CollectionGalleryComponent,
        SafePipe,
    ],
    providers: [CollectionResolver],
    imports: [
        CommonModule,
        MaterialModule,
        DxHtmlEditorModule,
        NgOptimizedImage,
        GalleryLightboxModule,
        CollectionsEditRoutingModule,
        ImageMaintenanceModule,
        IconsModule,
        SharedModule,
        LightboxModule, NgFor, AsyncPipe

    ]
})
export class CollectionsAdminModule {}
