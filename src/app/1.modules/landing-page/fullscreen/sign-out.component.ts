import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'sign-out-fullscreen',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  
})
export class SignOutFullscreenComponent implements OnInit {
  
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;
  redirect = ['profile'];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private authService: AngularFireAuth,
    public router: Router
  ) {}

  signOut() {
    // console.debug('Sign out');
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    // Create the form
    this.authService.signOut();
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
      const loggedIn = await this.authService.signInWithEmailAndPassword(email, password);
      this.router.navigate(this.redirect);
    } catch (e) {
      console.error(e);
    }
  }
}
