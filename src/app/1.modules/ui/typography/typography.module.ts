import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from '@made-to/components/highlight';
import { SharedModule } from 'app/shared/shared.module';
import { TypographyComponent } from 'app/features/admin/ui/typography/typography.component';

export const routes: Route[] = [
  {
    path: '',
    component: TypographyComponent,
  },
];

@NgModule({
  declarations: [TypographyComponent],
  imports: [
    RouterModule.forChild(routes),
    MatTabsModule,
    FuseHighlightModule,
    SharedModule,
  ],
})
export class TypographyModule {}
