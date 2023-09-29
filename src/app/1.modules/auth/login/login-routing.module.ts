import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFirebaseUIComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginFirebaseUIComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
