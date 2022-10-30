import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryLightboxComponent } from './gallery-lightbox.component';

@NgModule({
  declarations: [GalleryLightboxComponent],
  imports: [
    CommonModule,
  ],
  exports: [GalleryLightboxComponent]

})
export class GalleryLightboxModule { }
