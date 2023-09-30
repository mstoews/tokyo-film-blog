import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { EmailAuthProvider } from 'firebase/auth';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router) {

    }

    ngOnInit() {

        this.afAuth.app.then(app => {

          const uiConfig = {
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                    signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
                },
                credentialHelper: firebaseui.auth.CredentialHelper.NONE
            };

            this.ui = new firebaseui.auth.AuthUI(app.auth());
            this.ui.start("#firebaseui-auth-container", uiConfig);
            // this.ui.disableAutoSignIn();
        });

    }

    ngOnDestroy() {
        this.ui.delete();
    }

    onLoginSuccessful(result) {
        console.log('Firebase UI result:', result);
        this.router.navigateByUrl("/courses");
    }
}


