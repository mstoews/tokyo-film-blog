import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { FuseCardModule } from '@fuse/components/card';
import { IconsModule } from 'app/icons.module';
import { CollectionsEditRoutingModule } from './collections-routing.module';

import { CollectionsEditComponent } from './collections-edit/collections-edit.component';
import { SafePipe } from './safe.pipe';

import { CollectionsImageSelectionComponent } from './collections-image-selection/collections-image-selection.component';
import { SharedModule } from '../shared-module/shared.module';
import { CollectionsAddDialog } from './add/collections-add.component';
import { CollectionsAdminComponent } from './collections-grid.component';
import { CollectionResolver } from 'app/4.services/collection.resolver';

@NgModule({
  declarations: [
    CollectionsEditComponent,
    CollectionsAdminComponent,
    CollectionsImageSelectionComponent,
    CollectionsAddDialog,
    SafePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    SharedModule,
    FuseCardModule,
    IconsModule,
    CollectionsEditRoutingModule,
  ],
  providers: [CollectionResolver],
})
export class CollectionsAdminModule {}
