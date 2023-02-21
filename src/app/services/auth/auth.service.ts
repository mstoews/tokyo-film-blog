import { Injectable } from '@angular/core';
import { IUser } from './users';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { map, Observable, of } from 'rxjs';
import { UserRoles } from 'app/models/user-roles';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string | null>;
  roles$: Observable<UserRoles | any>;

  // private subject = new BehaviorSubject<User>(ANONYMOUS_USER);
  private userCollection: AngularFirestoreCollection<User>;
  private userItems: Observable<User[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map((user: any) => !!user));
    this.isLoggedOut$ = this.afAuth.authState.pipe(map((loggedIn: any) => !!loggedIn));
    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));
    this.roles$ = this.afAuth.idTokenResult.pipe(map(token => token?.claims ?? { admin: false }));

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log('UserID : ', JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        //localStorage.setItem('user', 'null');
        //JSON.parse(localStorage.getItem('user')!);
        this.loginAnonymously();
      }
    });

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('Auth state changed : ', JSON.stringify(user));
        let uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }



  getAuth(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  async loginAnonymously() {
    this.afAuth.signInAnonymously().then((result) => {
      //this.SendVerificationMail();
      this.SetUserData(result.user);
    })
      .catch((error) => {
        this.snackBar.open(error, 'Error', { duration: 3000 });
      });
  }

  async linkingCredentials(email: string, password: string) {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword( email,  password );
      // const user = await this.afAuth.currentUser.linkWithCredential(credential);

    } catch (e) {
      console.error(e);
      return;
    }
    
  }

  async signIn(email: string, password: string) {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword(
        email as string,
        password as string
      );
    } catch (e) {
      console.error(e);
      return;
    }
  }

  async signOut() {
    try {
      this.afAuth.signOut();
      localStorage.setItem('user', 'null');
      JSON.parse(localStorage.getItem('user')!);
      this.router.navigateByUrl('/login');
    } catch (e) {
      console.error(e);
      return;
    }
  }
  // async SignOut() {
  //   return this.afAuth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['sign-in']);
  //   });
  // }

  async registerUser(user: IUser, password: string) {
    try {
      const credentials = await this.afAuth.createUserWithEmailAndPassword(
        user.email as string,
        password as string
      );

      if (!credentials.user) {
        throw new Error("User can't be found");
      }

    } catch (e) {
      console.error(e);
      return;
    }
  }

  async SignUp(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async isAdmin() {
    return (await this.afAuth.currentUser).getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims.admin) { return true; }
      else {
        return false;
      }
    });
  }

  async getUserId() {
    return (await this.afAuth.currentUser).uid;
  }

  async SendVerificationMail() {
    await this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  async ForgotPassword(passwordResetEmail: string) {
    await this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      age: user.age,
      role: {
        admin: false,
        subscriber: true,
        editor: false
      }
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out

}
