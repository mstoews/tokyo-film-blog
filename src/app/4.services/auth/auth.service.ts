import { Injectable, OnDestroy } from '@angular/core';
import { IUser } from './users';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { UserRoles } from 'app/5.models/user-roles';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  userData: any;
  userId: string;
  isAnonymous: boolean;
  isAdminUser: boolean;
  isRegistered: boolean;
  email: string;
  private userName: string;
  private destroy$ = new Subject<void>();


  // private subject = new BehaviorSubject<User>(ANONYMOUS_USER);
  private userCollection: AngularFirestoreCollection<User>;
  private userItems: Observable<User[]>;

  setUserName(userName: string) {
    this.userName = userName;
  }

  getUserName(): string {
    return this.userName;
  }

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isAdminUser = false;

    this.afAuth.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.afAuth.onAuthStateChanged((user) => {
      // console.debug('Auth state changed ...')
      if (user) {
        this.userId = user.uid;
        this.email = user.email;
        this.isAnonymous = user.isAnonymous;

        // console.debug('logged in state', JSON.stringify(user));
      } else {
        this.userId = undefined;
        this.email = undefined;
        this.isRegistered = undefined;
        // console.debug('logged out state', JSON.stringify(user));
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loginAnonymously() {
    this.afAuth
      .signInAnonymously()
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.snackBar.open(error, 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
        });
      });
  }

  async linkingCredentials(email: string, password: string) {
    try {
      const credentials = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
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

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState
        .pipe(takeUntil(this.destroy$))
        .subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp2(email: string, password: string) {
    return this.afAuth
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

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  // Reset Forggot password
  ForgotPassword2(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn2(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new this.afAuth.GoogleAuthProvider()).then((res: any) => {
  //     this.router.navigate(['dashboard']);
  //   });
  // }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);

        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isRegistered = false;
      this.router.navigate(['/home']);
    });
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

  async getUserId() {
    return (await this.afAuth.currentUser).uid;
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
}
// Sign out
