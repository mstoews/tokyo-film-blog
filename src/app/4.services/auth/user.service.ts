import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserRoles } from '../../5.models/user-roles';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  uid$: Observable<string>;
  roles$: Observable<UserRoles>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.pictureUrl$ = afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  async getUserId(): Promise<any> {
    return (await this.afAuth.currentUser).uid;
  }

  async getUserEmail(): Promise<any> {
    let email: string;
    this.afAuth.currentUser.then((user) => {
      if (user !== null || user !== undefined) {
        if (user) {
          email = user.email;
        }
      } else {
        email = '';
      }
    });
    return email;
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
function of(email: string): any {
  throw new Error('Function not implemented.');
}
