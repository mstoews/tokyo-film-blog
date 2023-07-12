import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@made-to/components/alert';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SignUpClassicComponent } from './classic/sign-up.component';
import { SignUpModernComponent } from './modern/sign-up.component';
import { SignUpModernReversedComponent } from './modern-reversed/sign-up.component';
import { SignUpFullscreenComponent } from './fullscreen/sign-up.component';
import { SignUpFullscreenReversedComponent } from './fullscreen-reversed/sign-up.component';
import { SignUpSplitScreenComponent } from './split-screen/sign-up.component';
import { SignUpSplitScreenReversedComponent } from './split-screen-reversed/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-up',
    children: [
      {
        path: 'classic',
        component: SignUpClassicComponent,
      },
      {
        path: 'modern',
        component: SignUpModernComponent,
        data: { state: 'modern' },
      },
      {
        path: 'modern-reversed',
        component: SignUpModernReversedComponent,
      },
      {
        path: 'split-screen',
        component: SignUpSplitScreenComponent,
      },
      {
        path: 'split-screen-reversed',
        component: SignUpSplitScreenReversedComponent,
      },
      {
        path: 'fullscreen',
        component: SignUpFullscreenComponent,
      },
      {
        path: 'fullscreen-reversed',
        component: SignUpFullscreenReversedComponent,
      },
      {
        path: '**',
        redirectTo: '/home',
      },
    ],
  },
];

const components = [
  SignUpClassicComponent,
  SignUpModernComponent,
  SignUpModernReversedComponent,
  SignUpFullscreenComponent,
  SignUpFullscreenReversedComponent,
  SignUpSplitScreenComponent,
  SignUpSplitScreenReversedComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseAlertModule,
    SharedModule,
  ],
  exports: [...components],
})
export class SignUpModule {}
