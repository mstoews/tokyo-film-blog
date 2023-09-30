import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import * as firebaseui from 'firebaseui';

import { Router } from '@angular/router';
import firebase from 'firebase/app';
import SignInWithEmailAndPassword from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'sign-in-classic',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInClassicComponent implements OnInit  {
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

    // this.afAuth.app.then((app) => {
    //   const uiConfig = {
    //     //autoUpgradeAnonymousUsers: true,
    //     signInOptions: [
    //       EmailAuthProvider.PROVIDER_ID,

    //       GoogleAuthProvider.PROVIDER_ID,
    //     ],
    //     callbacks: {
    //       signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
    //     },
    //     requireDisplayName: false
    //   };

    //   this.ui = new firebaseui.auth.AuthUI(app.auth());

    //   this.ui.start('#firebaseui-auth-container', uiConfig);

    //   this.ui.disableAutoSignIn();
    // });
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

    // await signInWithEmailAndPassword(
    //   this.auth
    //   credentials.email,
    //   credentials.password
    // )
    //   .then((userCreds) => {
    //     this._authenticated = true;
    //     const user = userCreds.user;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });



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

  // async signInEmail() {
  //   const { email, password } = this.signInForm.value
  //   // console.debug(`email ${email} , ${password}`)
  //   try {
  //     const loggedIn = await this.authService.signIn(email, password)
  //     this.router.navigate(this.redirect)
  //   } catch (e) {
  //     console.error(e)
  //     console.debug("tesst");
  //   }
  // }

  // ngOnDestroy() {
  //   this.ui.delete();
  // }
