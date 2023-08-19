import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogResolver } from 'app/4.services/blog.resolver';
import { BlogComponent } from './blog.component';
import { DetailComponent } from './detail/detail.component';
import { TailoringBlogComponent } from './tailoring-blog/tailoring-blog.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
  },
  {
    path: 'tailoring',
    pathMatch: 'full',
    component: TailoringBlogComponent,
  },
  {
    path: 'detail/:id',
    title: 'Thoughts',
    component: DetailComponent,
    resolve: {
      blog: BlogResolver,
    },
    data: { state: 'detail/:id' },
  },
  {
    path: 'tailoring/:id',
    title: 'Tailoring',
    component: DetailComponent,
    resolve: {
      blog: BlogResolver,
    },
    data: { state: 'tailoring/:id' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogRoutingModule],
})
export class BlogRoutingModule {}
