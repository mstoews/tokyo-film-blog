import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FashionComponent } from './fashion/fashion.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { DetailComponent } from './detail/detail.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { MaterialModule } from 'app/material.module';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogResolver} from 'app/services/blog.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlogComponent,
  },
  {
    path: 'cart/:id',
    pathMatch: 'full',
    title: 'Shopping Items',
    component: DetailComponent,
    resolve: {
      blog: BlogResolver
    }
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
    WeeklyComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class BlogModule { }
