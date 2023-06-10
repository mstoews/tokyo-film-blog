import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SignInClassicComponent } from './classic/sign-in.component';
import { SignInModernComponent } from './modern/sign-in.component';
import { SignInModernReversedComponent } from './modern-reversed/sign-in.component';
import { SignInFullscreenComponent } from './fullscreen/sign-in.component';
import { SignInFullscreenReversedComponent } from './fullscreen-reversed/sign-in.component';
import { SignInSplitScreenComponent } from './split-screen/sign-in.component';
import { SignInSplitScreenReversedComponent } from './split-screen-reversed/sign-in.component';
import { FuseCardModule } from '@fuse/components/card';

const routes: Routes = [
  {
    path: 'sign-in',
    children: [
      {
        path: 'classic',
        component: SignInClassicComponent,
        data: { state: 'classic' },
      },
      {
        path: 'modern',
        component: SignInModernComponent,
        data: { state: 'modern' },
      },
      {
        path: 'modern-reversed',
        component: SignInModernReversedComponent,
        data: { state: 'modern-reversed' },
      },
      {
        path: 'split-screen',
        component: SignInSplitScreenComponent,
        data: { state: 'split-screen' },
      },
      {
        path: 'split-screen-reversed',
        component: SignInSplitScreenReversedComponent,
      },
      {
        path: 'fullscreen',
        component: SignInFullscreenComponent,
      },
      {
        path: 'fullscreen-reversed',
        component: SignInFullscreenReversedComponent,
      },
    ],
  },
];

const components = [
  SignInClassicComponent,
  SignInModernComponent,
  SignInModernReversedComponent,
  SignInFullscreenComponent,
  SignInFullscreenReversedComponent,
  SignInSplitScreenComponent,
  SignInSplitScreenReversedComponent,
];

const modules = [
  RouterModule.forChild(routes),
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  FuseAlertModule,
  SharedModule,
  FuseCardModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class SignInModule {}
