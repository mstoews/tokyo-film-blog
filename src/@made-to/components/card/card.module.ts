import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseCardComponent } from '@made-to/components/card/card.component';

@NgModule({
  declarations: [FuseCardComponent],
  imports: [CommonModule],
  exports: [FuseCardComponent],
})
export class FuseCardModule {}
