import { NgModule } from '@angular/core';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignOutModule } from './sign-out/sign-out.module';
import { LoginModule } from './login/login.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
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
