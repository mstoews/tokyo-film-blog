import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SignOutClassicComponent } from './classic/sign-out.component';
import { SignOutModernComponent } from './modern/sign-out.component';
import { SignOutModernReversedComponent } from './modern-reversed/sign-out.component';
import { SignOutFullscreenComponent } from './fullscreen/sign-out.component';
import { SignOutFullscreenReversedComponent } from './fullscreen-reversed/sign-out.component';
import { SignOutSplitScreenComponent } from './split-screen/sign-out.component';

const routes: Routes = [
  {
    path: 'sign-out',
    children: [
      {
        path: 'classic',
        component: SignOutClassicComponent,
      },
      {
        path: 'modern',
        component: SignOutModernComponent,
      },
      {
        path: 'modern-reversed',
        component: SignOutModernReversedComponent,
      },
      {
        path: 'split-screen',
        component: SignOutSplitScreenComponent,
      },
      {
        path: 'fullscreen',
        component: SignOutFullscreenComponent,
      },
      {
        path: 'fullscreen-reversed',
        component: SignOutFullscreenReversedComponent,
      },
    ],
  },
];

const components = [
  SignOutClassicComponent,
  SignOutModernComponent,
  SignOutFullscreenComponent,
  SignOutFullscreenReversedComponent,
  SignOutSplitScreenComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
  exports: [...components],
})
export class SignOutModule {}
