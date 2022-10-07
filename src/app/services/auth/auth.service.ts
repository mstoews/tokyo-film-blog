import { Injectable } from '@angular/core';
import {IUser } from './users';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';


import {
   Firestore
} from '@angular/fire/firestore'
import { User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router) {

     this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });

  }

  async signIn(email: string, password: string){
    try {
       const credentials = await this.afAuth.signInWithEmailAndPassword(email as string, password as string)
    }
    catch (e) {
      console.error(e)
      return
    }
  }

  async signOut(){
    try {
      this.afAuth.signOut();
      }
      catch (e) {
        console.error(e)
        return
      }
  }

  async registerUser(user: IUser, password: string) {
    try {
      const credentials = await this.afAuth.createUserWithEmailAndPassword(user.email as string, password as string)
      await this.afs.collection('user').add({
        name: user.displayName,
        email: user.email,
        age: user.age,
        phoneNumber: user.phoneNumber
      });
    } catch (e)
    {
      console.error(e)
      return
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

  async SendVerificationMail() {
    await this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  async ForgotPassword(passwordResetEmail: string) {
    await this.afAuth.sendPasswordResetEmail(passwordResetEmail)
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
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
