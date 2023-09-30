import { CanActivateFn } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const user = auth.currentUser;
    const loggedIn = !!user;
    return loggedIn;
};
