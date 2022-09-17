import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { provideAuth, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const auth = getAuth();
    const user = await auth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      console.log('access denied');
      this.router.navigate(['/authentication/sign-in/split-screen']);
    }
    return isLoggedIn;
  }
}

