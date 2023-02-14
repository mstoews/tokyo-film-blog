import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routing';
import { HeadingModule } from 'app/main/heading-module/heading.module';
import { AddressComponent } from './address/address.component';
import { MaterialModule } from "../../../material.module";
import { SignOutModule } from '../authentication/sign-out/sign-out.module';
import { SharedModule } from 'app/features/shared-module/shared.module';
import { SignInModule } from '../authentication/sign-in/sign-in.module';
import { SignUpModule } from '../authentication/sign-up/sign-up.module';


@NgModule({
    declarations: [
        ProfileComponent,
 
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MaterialModule,
        FuseCardModule,
        SharedModule,
        AddressComponent,
        SignOutModule,
        HeadingModule,
        SignInModule,
        SignUpModule,
        SignOutModule

    ],
    exports: [
      ProfileComponent
    ],
})
export class ProfileModule
{
}
