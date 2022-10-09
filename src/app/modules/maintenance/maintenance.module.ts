import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images/images.component';
import { MaterialModule } from 'app/MaterialModule';

import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { RouterModule, Routes } from '@angular/router';
import { ImagesMenubarComponent } from './grid-menubar/image-menubar.component';



const routes: Routes = [
  {
    path: 'images',
    pathMatch: 'full',
    component: ImagesComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ImagesComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: ImagesComponent,
  },
];



@NgModule({
  declarations: [
    ImagesComponent,
    ImagesMenubarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
  ]
})
export class MaintenanceModule { }
