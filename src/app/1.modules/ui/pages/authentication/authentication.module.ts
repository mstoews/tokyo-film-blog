import { NgModule } from '@angular/core';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignOutModule } from './sign-out/sign-out.module';
import { LoginModule } from './login/login.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then(
        (mod) => mod.SignInModule
      ),
    data: { state: 'login' },
  },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SignInModule,
        SignUpModule,
        SignOutModule,
        ReactiveFormsModule,
        FormsModule,
        LoginModule,
    ],
    exports: [
        SignInModule,
        SignUpModule,
        SignOutModule,
        LoginModule,
    ]
})
export class AuthenticationModule
{
}
