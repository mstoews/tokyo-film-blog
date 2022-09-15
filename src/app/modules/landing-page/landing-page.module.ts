import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { GalleryCardComponent } from '../../components/gallery-card/gallery-card.component';
import { GalleryComponent } from '../../components/gallery/gallery.component'
import { SharedModule } from 'app/modules/shared-module/shared.module';
import { RouterModule, Routes } from '@angular/router';

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
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    GalleryCardComponent,
    GalleryComponent,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class LandingPageModule { }
