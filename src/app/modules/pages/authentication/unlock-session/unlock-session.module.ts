import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/modules/shared-module/shared.module';
import { UnlockSessionClassicComponent } from './classic/unlock-session.component';
import { UnlockSessionModernComponent } from './modern/unlock-session.component';
import { UnlockSessionModernReversedComponent } from './modern-reversed/unlock-session.component';
import { UnlockSessionFullscreenComponent } from './fullscreen/unlock-session.component';
import { UnlockSessionFullscreenReversedComponent } from './fullscreen-reversed/unlock-session.component';
import { UnlockSessionSplitScreenComponent } from './split-screen/unlock-session.component';
import { UnlockSessionSplitScreenReversedComponent } from './split-screen-reversed/unlock-session.component';

const routes: Routes = [
    {
        path    : 'unlock-session',
        children: [
            {
                path     : 'classic',
                component: UnlockSessionClassicComponent
            },
            {
                path     : 'modern',
                component: UnlockSessionModernComponent
            },
            {
                path     : 'modern-reversed',
                component: UnlockSessionModernReversedComponent
            },
            {
                path     : 'split-screen',
                component: UnlockSessionSplitScreenComponent
            },
            {
                path     : 'split-screen-reversed',
                component: UnlockSessionSplitScreenReversedComponent
            },
            {
                path     : 'fullscreen',
                component: UnlockSessionFullscreenComponent
            },
            {
                path     : 'fullscreen-reversed',
                component: UnlockSessionFullscreenReversedComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        UnlockSessionClassicComponent,
        UnlockSessionModernComponent,
        UnlockSessionModernReversedComponent,
        UnlockSessionFullscreenComponent,
        UnlockSessionFullscreenReversedComponent,
        UnlockSessionSplitScreenComponent,
        UnlockSessionSplitScreenReversedComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class UnlockSessionModule
{
}
