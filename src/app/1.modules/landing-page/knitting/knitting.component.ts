import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-knitting',
  templateUrl: './knitting.component.html',
  styleUrls: ['./knitting.component.css']
})
export class KnittingComponent implements OnInit {

  showAlert: boolean = false;
  redirect = ['/home'];
  ui: firebaseui.auth.AuthUI;

  signInForm: UntypedFormGroup;
  _authenticated: boolean;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private _formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    // Create the form

    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });

  }

  onSignIn() {

    const { email, password } = this.signInForm.value;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.debug('User ', user);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.debug('Error ', error);
      });
  }

   

  onLoginSuccess(result) {
    const user = this.afAuth.currentUser;
    user
      .then((sendEmail) => {
        console.debug('Verification mail ', sendEmail.emailVerified);
        if (sendEmail.emailVerified == false) {
          sendEmail.sendEmailVerification();
        }

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.debug('Verification email not sent', error.message);
      })
      .finally();
  }

}
