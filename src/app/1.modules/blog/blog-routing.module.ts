import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BlogResolver,
  CalendarResolver,
  CinemaResolver,
} from 'app/4.services/blog.resolver';
import { BlogComponent } from './blog.component';
import { DetailComponent } from './detail/detail.component';
import { CinemaBlogComponent } from './cinema-blog/cinema-blog.component';
import { CinemaDetailComponent } from './cinema-blog/cinema-detail/cinema-detail.component';
import { CalendarBlogComponent } from './calendar-blog/calendar-blog.component';
import { CalendarDetailComponent } from './calendar-blog/calendar-detail/calendar-detail.component';

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
    path: 'Cinema',
    pathMatch: 'full',
    component: CinemaBlogComponent,
  },
  {
    path: 'Cinema/:id',
    title: 'Cinema',
    component: CinemaDetailComponent,
    resolve: {
      blog: BlogResolver,
    },
    data: { state: 'Cinema/:id' },
  },
  {
    path: 'calendar',
    pathMatch: 'full',
    component: CalendarBlogComponent,
  },
  {
    path: 'calendar/:id',
    title: 'Calendar',
    component: CalendarDetailComponent,
    resolve: {
      blog: BlogResolver,
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
