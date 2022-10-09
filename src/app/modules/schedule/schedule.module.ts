import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { GalleryComponent } from '../../components/gallery/gallery.component'

@NgModule({
  declarations: [
    ScheduleComponent,

  ],
  imports: [
    CommonModule,
    GalleryComponent
  ]
})
export class ScheduleModule { }
