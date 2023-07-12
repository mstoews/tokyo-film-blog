import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from '@made-to/components/highlight';
import { ColorsComponent } from 'app/1.modules/ui/colors/colors.component';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';

export const routes: Route[] = [
  {
    path: '',
    component: ColorsComponent,
  },
];

@NgModule({
  declarations: [ColorsComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatRippleModule,
    MatTabsModule,
    FuseHighlightModule,
    SharedModule,
  ],
})
export class ColorsModule {}
