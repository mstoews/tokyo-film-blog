import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { DxHtmlEditorModule } from 'devextreme-angular';

import { IconsModule } from 'app/icons.module';
import { CollectionsEditRoutingModule } from './collections-routing.module';

import { CollectionsEditComponent } from './collection-edit/collections-edit.component';
import { SafePipe } from './safe.pipe';

import { CollectionsImageSelectionComponent } from './collections-image-selection/collections-image-selection.component';
import { SharedModule } from '../shared-module/shared.module';
import { CollectionsAddDialog } from './add/collections-add.component';

import { CollectionResolver } from 'app/4.services/collection.resolver';
import { CollectionsDetailsAddDialog } from './collections-details-add/collections-details-add.component';

import { CollectionsAdminComponent } from './collection-grid/collections-grid.component';
import { CollectionsDetailsGridComponent } from './collection-details/collections-details-grid.component';
import { CollectionPreviewComponent } from './collection-preview/collection-preview.component';
import { CollectionImageCardComponent } from './collection-image-card/collection-image-card.component';
import { ImageMaintenanceModule } from '../admin/image-maintenance/image-maintenance.module';

@NgModule({
  declarations: [
    CollectionsEditComponent,
    CollectionsAdminComponent,
    CollectionsImageSelectionComponent,
    CollectionsAddDialog,
    CollectionsDetailsAddDialog,
    CollectionsDetailsGridComponent,
    SafePipe,
    CollectionPreviewComponent,
    CollectionImageCardComponent,
  ],
  providers: [CollectionResolver],
  imports: [
    CommonModule,
    MaterialModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    SharedModule,

    IconsModule,
    CollectionsEditRoutingModule,
    ImageMaintenanceModule,
  ],
})
export class CollectionsAdminModule {}
