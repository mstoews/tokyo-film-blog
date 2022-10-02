import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider,EmailAuthProvider,signInWithPopup ,signInWithEmailAndPassword , setPersistence, browserSessionPersistence, browserLocalPersistence, signInAnonymously, } from '@angular/fire/auth';

@Component({
    selector     : 'sign-in-split-screen',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class SignInSplitScreenComponent implements OnInit
{
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm!: UntypedFormGroup;
    showAlert: boolean = false;
    redirect = ['/home'];

    constructor(
        @Optional() private auth: Auth,
        private _formBuilder: UntypedFormBuilder,
        public router: Router) {}

    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : [''],
            password  : [''],
            rememberMe: ['']
        });

        const provider = new GoogleAuthProvider();
    }

  signInEmail() {
    // this.loginWithEmail();
    const email = this.signInForm.get('email');
    const password = this.signInForm.get('password');
    const pw = password?.value;
    const em = email?.value;
    const loggedOn = this.signIn(em, pw);
  }

  async signIn(email : string, password : string) {

      return signInWithEmailAndPassword(this.auth, email, password ).then((creds: any) => {
          const user = creds.user;
          console.log(user.email);
          console.log('successfuly logged in... : ', user);
          this.router.navigate(this.redirect);
      }).catch ((error: any) => {
        const erroCode = error.code;
        const errorMsg = error.message;
        console.log(`${errorMsg} : ${erroCode}`)
      });
  }

  async loginWithEmail() {
    const provider = new EmailAuthProvider();
    await signInWithPopup(this.auth, provider);
    await this.router.navigate(this.redirect);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    await this.router.navigate(this.redirect);
  }

  async loginAnonymously() {
    await signInAnonymously(this.auth);
    await this.router.navigate(this.redirect);
  }
}


