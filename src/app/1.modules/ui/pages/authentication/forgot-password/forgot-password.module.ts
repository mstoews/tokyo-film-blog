import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { ForgotPasswordClassicComponent } from './classic/forgot-password.component';

const routes: Routes = [
  {
    path: 'forgot-password',
    children: [
      {
        path: 'classic',
        component: ForgotPasswordClassicComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ForgotPasswordClassicComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class ForgotPasswordModule {}
