import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';
import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "./services/auth/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthTokenService } from './services/auth/auth-token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('1.0s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate('1.0s ease-in-out', style({ transform: 'translateX(-100%)' })),

            ], { optional: true }),
        ])
      ])
    ])
  ],
})
export class AppComponent implements OnInit {
  isLoggedOut$: Observable<boolean>;
  User$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private token: AuthTokenService
  ) {

  }

  ngOnInit(): void {

    this.isLoggedOut$ = this.afAuth.authState.pipe(map(loggedIn => !loggedIn));

    this.isLoggedOut$.subscribe((loggedOut) => {
      if (loggedOut === true) {
        this.authService.loginAnonymously().then(login => {
          loggedOut = false;
        })
          .catch((error) => {
            let errorMessage = error.message;
            this.snackBar.open(`Failed to login anonymously: ${errorMessage}`, 'Error', { duration: 3000 });
          });
      }
    });

  }

  title = 'Made-To';
  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
