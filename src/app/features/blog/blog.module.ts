import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { FashionComponent } from './fashion/fashion.component';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'app/material.module';
import { BlogResolver} from 'app/services/blog.resolver';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { SafePipe } from './safe.pipe';
import { HeaderComponent } from 'app/components/header/header.component';
import { FuseCardModule } from '@fuse/components/card';
import { IconsModule } from 'app/icons.module';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogRoutingModule } from './blog-routing/blog-routing.module';



@NgModule({
  declarations: [
    BlogComponent,
    FashionComponent,
    DetailComponent,
    SafePipe,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    HeaderComponent,
    FuseCardModule,
    IconsModule,
    BlogRoutingModule
  ],
  providers: [
    BlogResolver
  ]
})
export class BlogModule { }
