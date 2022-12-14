import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { ColorsComponent } from 'app/features/ui/colors/colors.component';
import { SharedModule } from 'app/features/shared-module/shared.module';

export const routes: Route[] = [
    {
        path     : '',
        component: ColorsComponent
    }
];

@NgModule({
    declarations: [
        ColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatIconModule,
        MatRippleModule,
        MatTabsModule,
        FuseHighlightModule,
        SharedModule
    ]
})
export class ColorsModule
{
}
