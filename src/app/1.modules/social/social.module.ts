import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InstagramComponent } from './instagram/instagram.component';
import { RouterModule, Routes } from '@angular/router';
import { FuseCardModule } from '@made-to/components/card';
import { MaterialModule } from 'app/material.module';
import { SharedModule } from '../shared-module/shared.module';
import { IconsModule } from 'app/icons.module';

const routes: Routes = [
  {
    path: 'social',
    pathMatch: 'full',
    component: InstagramComponent,
  }
]

@NgModule({
  declarations: [
    InstagramComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgOptimizedImage,
    SharedModule,
    FuseCardModule,
    IconsModule,

  ],
  exports: [
    RouterModule
  ]

})

export class SocialModule { }
