import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routing';
import { HeaderComponent } from 'app/components/header/header.component';
import { AddressComponent } from './address/address.component';
import { MaterialModule } from "../../../material.module";

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MaterialModule,
        FuseCardModule,
        HeaderComponent,
        AddressComponent
    ],
    exports: [
      ProfileComponent
    ]
})
export class ProfileModule
{
}
