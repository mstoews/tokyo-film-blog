import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routing';
import { HeaderComponent } from 'app/main/header/header.component';
import { AddressComponent } from './address/address.component';
import { MaterialModule } from "../../../material.module";
import { SignOutModule } from '../authentication/sign-out/sign-out.module';
import { TestFormComponent } from './test-form/test-form.component';
import { SharedModule } from 'app/features/shared-module/shared.module';


@NgModule({
    declarations: [
        ProfileComponent,
        TestFormComponent,
    ],
    imports     : [
        RouterModule.forChild(profileRoutes),
        MaterialModule,
        FuseCardModule,
        SharedModule,
        AddressComponent,
        SignOutModule

    ],
    exports: [
      ProfileComponent
    ],
    entryComponents: [TestFormComponent]
})
export class ProfileModule
{
}
