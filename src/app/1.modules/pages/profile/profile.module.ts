import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routing';
import { HeadingModule } from 'app/2.main/header/heading.module';
import { AddressComponent } from './address/address.component';
import { MaterialModule } from '../../../material.module';
import { SignOutModule } from '../authentication/sign-out/sign-out.module';
import { SharedModule } from 'app/1.modules/shared-module/shared.module';
import { SignInModule } from '../authentication/sign-in/sign-in.module';
import { SignUpModule } from '../authentication/sign-up/sign-up.module';
import { CaraselComponent } from './carasel/carasel.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { TableRowComponent } from './table-row/table-row.component';
import { SetAdminComponent } from './set-admin/set-admin.component';
import { StripeCheckoutComponent } from '../../../3.components/stripe-checkout/stripe-checkout.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CaraselComponent,
    ProfileListComponent,
    TableRowComponent,
    SetAdminComponent,
  ],
  imports: [
    RouterModule.forChild(profileRoutes),
    MaterialModule,
    FuseCardModule,
    SharedModule,
    AddressComponent,
    SignOutModule,
    HeadingModule,
    SignInModule,
    SignUpModule,
    SignOutModule,
    StripeCheckoutComponent,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
