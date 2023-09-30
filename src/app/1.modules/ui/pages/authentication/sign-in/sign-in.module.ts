import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SignInClassicComponent } from './classic/sign-in.component';
import { LoginModule } from '../login/login.module';
import { AuthSignInComponent } from 'app/1.modules/auth/sign-in/sign-in.component';
import { AuthService } from 'app/1.modules/auth/auth/auth.service';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'classic',
        component: SignInClassicComponent,
        data: { state: 'classic' },
      },

    ],
  },
];

const components = [
  SignInClassicComponent,
];

const modules = [
  RouterModule.forChild(routes),
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  SharedModule,
  AuthSignInComponent
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  providers: [AuthService],
})
export class SignInModule {}
