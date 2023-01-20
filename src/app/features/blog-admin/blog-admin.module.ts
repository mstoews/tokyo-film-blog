import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { BlogResolver } from 'app/services/blog.resolver';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { HeaderComponent } from 'app/components/header/header.component';
import { FuseCardModule } from '@fuse/components/card';
import { IconsModule } from 'app/icons.module';
import { BlogEditRoutingModule } from './blog-routing.module';
import { BlogAdminComponent } from './blog-grid.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { SafePipe } from './safe.pipe';
import { BlogAddDialog } from './add/blog-add.component';
import { BlogImageSelectionComponent } from './blog-image-selection/blog-image-selection.component';

@NgModule({
  declarations: [
    BlogEditComponent,
    BlogAdminComponent,
    BlogImageSelectionComponent,
    BlogAddDialog,
    SafePipe,],
  imports: [
    CommonModule,
    MaterialModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    HeaderComponent,
    FuseCardModule,
    IconsModule,
    MaterialModule,
    BlogEditRoutingModule,
  ],
  providers: [BlogResolver],
})
export class BlogAdminModule {}
