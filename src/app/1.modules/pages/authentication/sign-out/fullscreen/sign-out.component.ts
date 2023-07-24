import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@made-to/animations';
import { FuseAlertType } from '@made-to/components/alert';
import { AuthService } from 'app/4.services/auth/auth.service';

@Component({
  selector: 'sign-out-fullscreen',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignOutFullscreenComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;
  redirect = ['profile'];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  signOut() {
    // console.debug('Sign out');
    this.authService.SignOut();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    // Create the form
    // this.authService.signOut();
    this.signInForm = this._formBuilder.group({
      email: [''],
      password: [''],
      rememberMe: [''],
    });
  }

  signUpEmail() {
    this.router.navigate(['/authentication/sign-up/modern']);
  }

  async signInEmail() {
    const { email, password } = this.signInForm.value;
    // console.debug(`email ${email} , ${password}`)
    try {
      const loggedIn = await this.authService.signIn(email, password);
      this.router.navigate(this.redirect);
    } catch (e) {
      console.error(e);
    }
  }
}
