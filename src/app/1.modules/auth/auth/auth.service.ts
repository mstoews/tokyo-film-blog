import { inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subscription, switchMap, throwError } from 'rxjs';
import { AuthUtils } from './auth.utils';

import {
    Auth,
    authState,
    setPersistence,
    GoogleAuthProvider,
    signInWithRedirect,
    signOut,
    User,
    getRedirectResult,
    getAdditionalUserInfo,
    UserCredential,
    signInWithPopup,
    signInWithEmailAndPassword,
  } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';


@Injectable()
export class AuthService implements OnDestroy {
    private _authenticated: boolean = false;
    userSubscription: Subscription | undefined;

    /**
     * Constructor
     */
    constructor(
    )
    {
        this.userSubscription = this.user$.subscribe((user) => {
            if (user) {
                console.log(user);
                this._authenticated = true;
            } else {
                this._authenticated = false;
            }
        });
    }

    private auth: Auth = inject(Auth);

    user$ = authState(this.auth);
    private provider = new GoogleAuthProvider();
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return of(true);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string) : boolean {
        this.resetPassword(email);
        return true;
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): boolean {
        sendPasswordResetEmail(this.auth, password).then(() => {
            // Password reset email sent!
            return true
          });
        return false;
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    async signIn(credentials: { email: string; password: string }): Promise<boolean> {

        let errorCount = 0;

        // Throw error, if the user is already logged in
        if (this._authenticated) {
            alert('You are already signed in!');
            const errorWithTimestamp$ = throwError(() => {
                const error: any = new Error(`This is error number ${++errorCount}`);
                error.timestamp = Date.now();
                return error;
            });

            errorWithTimestamp$.subscribe({
                error: err => console.log(err.timestamp, err.message)
            });

            errorWithTimestamp$.subscribe({
                error: err => console.log(err.timestamp, err.message)
            });


        }


        // Sign in

        await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password).then((userCreds) => {
                this._authenticated = true;
                const user = userCreds.user;

         }).catch((error) => {
            console.log(error);

        });
        return this._authenticated ;
    }




    /**
     * Sign out
     */
    signOut()  {
        // Remove the access token from the local storage
        signOut(this.auth).then(() => {
            localStorage.removeItem('accessToken');
            this._authenticated = false;
        });
        return true;
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string}): boolean  {
        createUserWithEmailAndPassword(this.auth, user.email, user.password).then((userCreds) => {
            const user = userCreds.user;
            console.log(user);
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
       });
       return false;
    }


    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        this.user$.subscribe((user) => {
            if (user) {
                console.log(user.displayName);
                this._authenticated = true;
            } else {
                this._authenticated = false;
            }
        });

        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return of(false);
    }

    ngOnDestroy(): void {
            this.userSubscription?.unsubscribe();
    }
}
