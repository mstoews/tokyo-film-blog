import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { GalleryCardComponent } from '../../3.components/gallery-card/gallery-card.component';
import { GalleryComponent } from '../../3.components/gallery/gallery.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared-module/shared.module';
import { MadeToServicesModule } from '../made-to-services/made-to-services.module';
import { LightboxModule } from '../lightbox';

import { ReadyToWearComponent } from './ready-to-wear/ready-to-wear.component';
import { KnittingComponent } from './knitting/knitting.component';
import { RepairsComponent } from './repairs/repairs.component';
import { HighlightComponent } from './highlight/highlight.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MaterialModule } from 'app/material.module';
import { IconsModule } from 'app/icons.module';
import { DataPolicyComponent } from './data-policy/data-policy.component';
import { TosComponent } from './tos/tos.component';
import { LastestBlogComponent } from 'app/3.components/lastest-blog/lastest-blog.component';
import { ServicesComponent } from './made-to-services/services.component';
import { FollowingComponent } from './following/following.component';
import { TwLighthouseComponent } from 'app/3.components/tw-lighthouse/tw-lighthouse.component';
import { CinemaComponent } from './cinema/cinema.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: { state: 'home' },
  },
  {
    path: 'contacts',
    pathMatch: 'full',
    component: ContactsComponent,
    data: { state: 'contacts' },
  },
  {
    path: 'data-policy',
    pathMatch: 'full',
    title: 'Data Policy',
    component: DataPolicyComponent,
    data: { state: 'data-policy' },
  },
  {
    path: 'Cinema',
    pathMatch: 'full',
    title: 'Services Cinema',
    component: CinemaComponent,
    data: { state: 'Cinema' },
  },
  {
    path: 'ready-to-wear',
    pathMatch: 'full',
    component: ReadyToWearComponent,
    data: { state: 'read-to-wear' },
  },
  {
    path: 'knitting',
    pathMatch: 'full',
    component: KnittingComponent,
    data: { state: 'knitting' },
  },
  {
    path: 'repairs',
    pathMatch: 'full',
    component: RepairsComponent,
    data: { state: 'repairs' },
  },
  {
    path: 'services',
    pathMatch: 'full',
    component: ServicesComponent,
    data: { state: 'services' },
  },
  {
    path: 'following',
    pathMatch: 'full',
    component: FollowingComponent,
    data: { state: 'following' },
  },

  {
    path: 'about_us',
    pathMatch: 'full',
    component: AboutUsComponent,
    data: { state: 'about_us' },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
];
@NgModule({
  declarations: [
    LandingPageComponent,
    BannerComponent,
    GalleryComponent,
    CinemaComponent,
    ReadyToWearComponent,
    KnittingComponent,
    RepairsComponent,
    HighlightComponent,
    AboutUsComponent,
    ContactsComponent,
    DataPolicyComponent,
    TosComponent,
    ServicesComponent,
    FollowingComponent,
  ],
  imports: [
    CommonModule,
    GalleryCardComponent,
    SharedModule,
    MadeToServicesModule,
    LightboxModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
    MaterialModule,
    IconsModule,
    LastestBlogComponent,
    TwLighthouseComponent,
  ],
})
export class LandingPageModule {}
