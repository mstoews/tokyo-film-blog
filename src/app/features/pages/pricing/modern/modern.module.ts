import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/features/shared-module/shared.module';
import { PricingModernComponent } from './modern.component';
import { pricingModernRoutes } from './modern.routing';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        PricingModernComponent
    ],
    imports     : [
        RouterModule.forChild(pricingModernRoutes),
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        FuseCardModule,
        SharedModule
    ]
})

export class PricingModernModule{}
