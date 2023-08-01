import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@made-to/components/alert';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { ConfirmationRequiredClassicComponent } from './classic/confirmation-required.component';
import { ConfirmationRequiredModernComponent } from './modern/confirmation-required.component';
import { ConfirmationRequiredModernReversedComponent } from './modern-reversed/confirmation-required.component';
import { ConfirmationRequiredFullscreenComponent } from './fullscreen/confirmation-required.component';
import { ConfirmationRequiredFullscreenReversedComponent } from './fullscreen-reversed/confirmation-required.component';
import { ConfirmationRequiredSplitScreenComponent } from './split-screen/confirmation-required.component';
import { ConfirmationRequiredSplitScreenReversedComponent } from './split-screen-reversed/confirmation-required.component';

const routes: Routes = [
  {
    path: 'confirmation-required',
    children: [
      {
        path: 'classic',
        component: ConfirmationRequiredClassicComponent,
      },
      {
        path: 'modern',
        component: ConfirmationRequiredModernComponent,
      },
      {
        path: 'modern-reversed',
        component: ConfirmationRequiredModernReversedComponent,
      },
      {
        path: 'split-screen',
        component: ConfirmationRequiredSplitScreenComponent,
      },
      {
        path: 'split-screen-reversed',
        component: ConfirmationRequiredSplitScreenReversedComponent,
      },
      {
        path: 'fullscreen',
        component: ConfirmationRequiredFullscreenComponent,
      },
      {
        path: 'fullscreen-reversed',
        component: ConfirmationRequiredFullscreenReversedComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ConfirmationRequiredClassicComponent,
    ConfirmationRequiredModernComponent,
    ConfirmationRequiredModernReversedComponent,
    ConfirmationRequiredFullscreenComponent,
    ConfirmationRequiredFullscreenReversedComponent,
    ConfirmationRequiredSplitScreenComponent,
    ConfirmationRequiredSplitScreenReversedComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseAlertModule,
    SharedModule,
  ],
})
export class ConfirmationRequiredModule {}
