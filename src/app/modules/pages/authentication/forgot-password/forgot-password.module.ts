import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/modules/shared-module/shared.module';
import { ForgotPasswordClassicComponent } from './classic/forgot-password.component';
import { ForgotPasswordModernComponent } from './modern/forgot-password.component';
import { ForgotPasswordModernReversedComponent } from './modern-reversed/forgot-password.component';
import { ForgotPasswordFullscreenComponent } from './fullscreen/forgot-password.component';

const routes: Routes = [
    {
        path    : 'forgot-password',
        children: [
            {
                path     : 'classic',
                component: ForgotPasswordClassicComponent
            },
            {
                path     : 'modern',
                component: ForgotPasswordModernComponent
            },
            {
                path     : 'modern-reversed',
                component: ForgotPasswordModernReversedComponent
            },

            {
                path     : 'fullscreen',
                component: ForgotPasswordFullscreenComponent
            },
        ]
    }
];

@NgModule({
    declarations: [
        ForgotPasswordClassicComponent,
        ForgotPasswordModernComponent,
        ForgotPasswordModernReversedComponent,
        ForgotPasswordFullscreenComponent,

    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class ForgotPasswordModule
{
}
