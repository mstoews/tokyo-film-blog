import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Router } from '@angular/router';
import { AuthService } from 'app/4.services/auth/auth.service';

@Component({
  selector: 'sign-in-split-screen',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignInSplitScreenComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;
  redirect = ['/home'];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: [''],
      password: [''],
      rememberMe: [''],
    });
  }

  async signInEmail() {
    const { email, password } = this.signInForm.value;
    // console.debug(`email ${email} , ${password}`);
    try {
      const loggedIn = await this.authService.signIn(email, password);
      this.router.navigate(this.redirect);
    } catch (e) {
      console.error(e);
    }
  }

  async signInWithGoogle() {}
}
