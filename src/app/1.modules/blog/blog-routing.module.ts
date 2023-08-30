import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogResolver, TailoringResolver } from 'app/4.services/blog.resolver';
import { BlogComponent } from './blog.component';
import { DetailComponent } from './detail/detail.component';
import { TailoringBlogComponent } from './tailoring-blog/tailoring-blog.component';
import { TailoringDetailComponent } from './tailoring-blog/tailoring-detail/tailoring-detail.component';
import { CalendarBlogComponent } from './calendar-blog/calendar-blog.component';

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
  {
    path: 'tailoring',
    pathMatch: 'full',
    component: TailoringBlogComponent,
  },
  {
    path: 'tailoring/:id',
    title: 'Tailoring',
    component: TailoringDetailComponent,
    resolve: {
      tailoring: TailoringResolver,
    },
    data: { state: 'tailoring/:id' },
  },
  {
    path: 'calendar',
    pathMatch: 'full',
    component: CalendarBlogComponent,
  },
  {
    path: 'calendar/:id',
    title: 'Calendar',
    component: CalendarBlogComponent,
    resolve: {
      calendar: BlogResolver,
    },
    data: { state: 'calendar/:id' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogRoutingModule],
})
export class BlogRoutingModule {}
