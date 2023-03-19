import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogResolver } from 'app/services/blog.resolver';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';
import { PolicyComponent } from './policy.component';

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
    component: PolicyComponent,
    resolve: {
      blog: BlogResolver,
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
