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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ]),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
        ])
      ])
    ])
   ],
})
export class AppComponent  implements OnInit {

  isLoggedIn$:  Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string | null>;

  constructor(
    private afAuth : AngularFireAuth
  )
  {
   
  }

  ngOnInit(): void {
      this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
      this.isLoggedOut$ = this.afAuth.authState.pipe(map(loggedIn => !loggedIn));
      this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL: null));
  }

  logout() {
    this.afAuth.signOut();
  }


  title = 'Made-To';
  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
