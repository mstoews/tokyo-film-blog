import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

import {
  CrossFieldErrorMatcher,
  confirmPasswordValidator,
} from './confirm-password.directive';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  errorMatcher = new CrossFieldErrorMatcher();

  signupForm: UntypedFormGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator }
  );

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.debug('signupForm', this.signupForm.value);

    this.httpClient
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
        { ...this.signupForm.value, returnSecureToken: true }
      )
      .subscribe(
        (response) => {
          console.debug('response', response);
          this.signupForm.reset();

          this.snackBar.open('Account Created!', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-success',
            duration: 3000,
          });

          this.router.navigate(['/']);
        },
        (error) => {
          let errorMessage = 'Signup Failed - ' + error.error.error.message;

          this.snackBar.open(errorMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-danger',
          });
        }
      );
  }
}
