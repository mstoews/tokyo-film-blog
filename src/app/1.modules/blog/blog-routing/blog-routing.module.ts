import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogResolver } from 'app/4.services/blog.resolver';
import { BlogComponent } from '../blog.component';
import { DetailComponent } from '../detail/detail.component';

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
      blog: BlogResolver,
    },
    data: { state: 'detail/:id' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogRoutingModule],
})
export class BlogRoutingModule {}
