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

  constructor(private afAuth: AngularFireAuth, private router: Router) {

  }

  user$ = this.afAuth.authState.pipe(
    map((authState) => {
      if (!authState) {
        return null;
      } else {
        return {
          uid: authState.uid,
          displayName: authState.displayName,
          email: authState.email,
          photoURL: authState.photoURL,
          emailVerified: authState.emailVerified,
        };
      }
    })
  );

  isLoggedIn$ = this.afAuth.authState.pipe(map((user) => !!user));

  isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

  roles$ = this.afAuth.idTokenResult.pipe(
    map((token) => <any>token?.claims ?? { admin: false })
  );

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
