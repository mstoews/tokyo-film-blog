import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/modules/shared-module/shared.module';
import { PricingModernComponent } from './modern.component';
import { pricingModernRoutes } from './modern.routing';

@NgModule({
    declarations: [
        PricingModernComponent
    ],
    imports     : [
        RouterModule.forChild(pricingModernRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        SharedModule
    ]
})

export class PricingModernModule{}
