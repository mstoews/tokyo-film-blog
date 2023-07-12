import { NgModule } from '@angular/core';
import { FuseScrollbarDirective } from '@made-to/directives/scrollbar/scrollbar.directive';

@NgModule({
  declarations: [FuseScrollbarDirective],
  exports: [FuseScrollbarDirective],
})
export class FuseScrollbarModule {}
