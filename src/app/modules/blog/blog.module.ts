import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FashionComponent } from './fashion/fashion.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { DetailComponent } from './detail/detail.component';
import { WeeklyComponent } from './weekly/weekly.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
  },
  {
    path: 'detail',
    pathMatch: 'full',
    component: DetailComponent,
  },
  {
    path: 'weekly',
    pathMatch: 'full',
    component: WeeklyComponent,
  },
  {
    path: 'newsletter',
    pathMatch: 'full',
    component: NewsletterComponent,
  },
];


@NgModule({
  declarations: [
    BlogComponent,
    NewsletterComponent,
    FashionComponent,
    LifestyleComponent,
    DetailComponent,
    WeeklyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BlogModule { }
