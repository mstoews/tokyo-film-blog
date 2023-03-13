import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BlogComponent } from './blog.component';
import { FashionComponent } from './fashion/fashion.component';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'app/material.module';
import { BlogResolver} from 'app/services/blog.resolver';
import { SafePipe } from './safe.pipe';
import { HeaderComponent } from 'app/main/header/header.component';
import { FuseCardModule } from '@fuse/components/card';
import { IconsModule } from 'app/icons.module';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogRoutingModule } from './blog-routing/blog-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommentsComponent } from './comments/comments.component';




@NgModule({
  declarations: [
    BlogComponent,
    FashionComponent,
    DetailComponent,
    SafePipe,
    BlogCardComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    SharedModule,
    FuseCardModule,
    IconsModule,
    BlogRoutingModule,

  ],
  providers: [
    BlogResolver
  ]
})
export class BlogModule { }
