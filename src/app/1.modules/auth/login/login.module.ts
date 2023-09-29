import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginRoutingModule } from './login-routing.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoginFirebaseUIComponent } from './login.component';

@NgModule({
  declarations: [
    LoginFirebaseUIComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    FirebaseModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {}
