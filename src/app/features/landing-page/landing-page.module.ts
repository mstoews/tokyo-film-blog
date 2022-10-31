import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { GalleryCardComponent } from '../../components/gallery-card/gallery-card.component';
import { GalleryComponent } from '../../components/gallery/gallery.component'

import { BannerComponent } from './banner/banner.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared-module/shared.module';
import { MadeToServicesModule } from '../made-to-services/made-to-services.module';
import { LightboxModule } from '../lightbox';

const routes: Routes = [
  {
    path: 'landing',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
];


@NgModule({
  declarations: [LandingPageComponent, BannerComponent, GalleryComponent],
  imports: [
    CommonModule,
    GalleryCardComponent,
    SharedModule,
    MadeToServicesModule,
    LightboxModule,
    RouterModule.forChild(routes),
  ]
})
export class LandingPageModule { }
