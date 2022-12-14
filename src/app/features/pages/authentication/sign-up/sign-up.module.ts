import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/features/shared-module/shared.module';
import { SignUpClassicComponent } from './classic/sign-up.component';
import { SignUpModernComponent } from './modern/sign-up.component';
import { SignUpModernReversedComponent } from './modern-reversed/sign-up.component';
import { SignUpFullscreenComponent } from './fullscreen/sign-up.component';
import { SignUpFullscreenReversedComponent } from './fullscreen-reversed/sign-up.component';
import { SignUpSplitScreenComponent } from './split-screen/sign-up.component';
import { SignUpSplitScreenReversedComponent } from './split-screen-reversed/sign-up.component';

const routes: Routes = [
    {
        path    : 'sign-up',
        children: [
            {
                path     : 'classic',
                component: SignUpClassicComponent
            },
            {
                path     : 'modern',
                component: SignUpModernComponent
            },
            {
                path     : 'modern-reversed',
                component: SignUpModernReversedComponent
            },
            {
                path     : 'split-screen',
                component: SignUpSplitScreenComponent
            },
            {
                path     : 'split-screen-reversed',
                component: SignUpSplitScreenReversedComponent
            },
            {
                path     : 'fullscreen',
                component: SignUpFullscreenComponent
            },
            {
                path     : 'fullscreen-reversed',
                component: SignUpFullscreenReversedComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        SignUpClassicComponent,
        SignUpModernComponent,
        SignUpModernReversedComponent,
        SignUpFullscreenComponent,
        SignUpFullscreenReversedComponent,
        SignUpSplitScreenComponent,
        SignUpSplitScreenReversedComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class SignUpModule
{
}
