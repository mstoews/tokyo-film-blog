import { NgModule } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
//import * as firebaseui from 'firebaseui-angular';

const firebaseUiAuthConfig: any = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // {
    //   scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
    //   customParameters: {
    //     auth_type: 'reauthenticate',
    //   },
    //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // },
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  exports: [FirebaseUIModule, AngularFireModule, AngularFireAuthModule],
})
export class FirebaseModule {}
