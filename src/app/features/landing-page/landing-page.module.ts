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
import { TailoringComponent } from './tailoring/tailoring.component';
import { ReadyToWearComponent } from './ready-to-wear/ready-to-wear.component';
import { KnittingComponent } from './knitting/knitting.component';
import { RepairsComponent } from './repairs/repairs.component';
import { HighlightComponent } from './highlight/highlight.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: LandingPageComponent,
  },

  {
    path: 'tailoring',
    pathMatch: 'full',
    title: 'Services Tailoring',
    component: TailoringComponent,
  },
  {
    path: 'ready-to-wear',
    pathMatch: 'full',
    component: ReadyToWearComponent,
  },
  {
    path: 'knitting',
    pathMatch: 'full',
    component: KnittingComponent,
  },
  {
    path: 'repairs',
    pathMatch: 'full',
    component: RepairsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
];


@NgModule({
  declarations: [LandingPageComponent, BannerComponent, GalleryComponent, TailoringComponent, ReadyToWearComponent, KnittingComponent, RepairsComponent, HighlightComponent],
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
