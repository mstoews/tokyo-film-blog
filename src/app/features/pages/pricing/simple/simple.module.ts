import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/features/shared-module/shared.module';
import { FusePricingSimpleComponent } from './simple.component';
import { pricingSimpleRoutes } from './simple.routing';

@NgModule({
    declarations: [
        FusePricingSimpleComponent
    ],
    imports     : [
        RouterModule.forChild(pricingSimpleRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})
export class PricingSimpleModule
{
}
