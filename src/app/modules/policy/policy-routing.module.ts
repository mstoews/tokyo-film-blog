import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyResolver } from 'app/services/policy.resolver';
import { PolicyComponent } from './policy.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PolicyComponent,
    data: { state: 'policy' },
  },
  {
    path: 'policy-admin/:id',
    title: 'Policy',
    component: PolicyEditComponent,
    resolve: {
      policy: PolicyResolver,
    },
    data: { state: 'policy/:id' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PolicyRoutingModule],
})
export class PolicyRoutingModule {}
