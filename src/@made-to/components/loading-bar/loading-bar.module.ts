import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseLoadingBarComponent } from '@made-to/components/loading-bar/loading-bar.component';

@NgModule({
  declarations: [FuseLoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [FuseLoadingBarComponent],
})
export class FuseLoadingBarModule {}
