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

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
  },
  {
    path: 'detail/:id',
    title: 'Thoughts',
    component: DetailComponent,
    resolve: {
      blog: BlogResolver
    },
    data: { state: 'detail/:id' }
  },
];


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
    RouterModule.forChild(routes),
    MaterialModule,
    DxHtmlEditorModule,
    NgOptimizedImage,
    HeaderComponent,
    FuseCardModule,
    IconsModule
  ]
})
export class BlogModule { }
