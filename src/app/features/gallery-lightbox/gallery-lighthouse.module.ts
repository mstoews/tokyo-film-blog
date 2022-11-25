import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GalleryLightboxComponent } from './gallery-lightbox.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [GalleryLightboxComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule

  ],
  exports: [GalleryLightboxComponent]

})
export class GalleryLightboxModule { }
