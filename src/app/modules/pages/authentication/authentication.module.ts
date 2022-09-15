import { NgModule } from '@angular/core';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignOutModule } from './sign-out/sign-out.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UnlockSessionModule } from './unlock-session/unlock-session.module';
import { ConfirmationRequiredModule } from './confirmation-required/confirmation-required.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SignInModule,
        SignUpModule,
        SignOutModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        UnlockSessionModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmationRequiredModule
    ],
    exports: [
        SignInModule,
        SignUpModule,
        SignOutModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        UnlockSessionModule,
        ConfirmationRequiredModule
    ]
})
export class AuthenticationModule
{
}
