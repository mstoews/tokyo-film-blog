import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@made-to/animations';
import { FuseAlertType } from '@made-to/components/alert';
import { AuthService } from 'app/4.services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in-modern',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignInModernComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;

  redirect = ['/home'];

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    const { email, password } = this.signInForm.value;
    try {
      const loggedIn = this._authService.signIn(email, password);
      this.router.navigate(this.redirect);
    } catch (e) {
      console.error(e);
    }
  }
}
