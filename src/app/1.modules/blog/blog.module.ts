import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BlogComponent } from './blog.component';
import { FashionComponent } from './fashion/fashion.component';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'app/material.module';
import { BlogResolver } from 'app/4.services/blog.resolver';
import { SafePipe } from './safe.pipe';
import { HeaderComponent } from 'app/2.main/header/header.component';
import { IconsModule } from 'app/icons.module';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { ReplyDialogComponent } from './reply-dialog/reply-dialog.component';
import { CinemaBlogComponent } from './cinema-blog/cinema-blog.component';

import { TailorCardComponent } from './cinema-blog/cinema-card/cinema-card.component';
import { CalendarBlogComponent } from './calendar-blog/calendar-blog.component';
import { CalendarCardComponent } from './calendar-blog/calendar-card/calendar-card.component';
import { CalendarDetailComponent } from './calendar-blog/calendar-detail/calendar-detail.component';
import { CinemaDetailComponent } from './cinema-blog/cinema-detail/cinema-detail.component';

@NgModule({
  declarations: [
    BlogComponent,
    FashionComponent,
    DetailComponent,
    SafePipe,
    BlogCardComponent,
    CommentsComponent,
    CommentsListComponent,
    ReplyDialogComponent,
    CinemaBlogComponent,
    CinemaDetailComponent,
    TailorCardComponent,
    CalendarBlogComponent,
    CalendarCardComponent,
    CalendarDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    SharedModule,
    IconsModule,
    BlogRoutingModule,
  ],
  providers: [BlogResolver],
  exports: [
    BlogComponent,
    BlogCardComponent,
    FashionComponent,
    DetailComponent,
  ],
})
export class MadeToBlogModule {}
