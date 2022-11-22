import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GalleryLightboxComponent } from './gallery-lightbox.component';

@NgModule({
  declarations: [GalleryLightboxComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [GalleryLightboxComponent]

})
export class GalleryLightboxModule { }
