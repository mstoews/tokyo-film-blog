import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { Router } from '@angular/router';
import { setPersistence, browserSessionPersistence } from '@angular/fire/auth';

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

    constructor(
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

    email = 'mstoews@hotmail.com';
    password = '162888';

  signIn() {
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence);
      signInWithEmailAndPassword(auth, this.email, this.password).then((creds) => {
          const user = creds.user;
          console.log('successfuly logged in... : ', user);
          this.router.navigate(['/landing']);
      }).catch ((error) => {
        const erroCode = error.code;
        const errorMsg = error.message;
        console.log(`${errorMsg} : ${erroCode}`)
      })
  }

  signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          const user = result.user;
          this.router.navigate(['/landing']);
       }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
}


