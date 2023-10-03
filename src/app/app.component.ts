import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';
import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './4.services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthTokenService } from './4.services/auth/auth-token.service';
import { UserService } from './4.services/auth/user.service';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { initTE, Lightbox } from 'tw-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
          optional: true,
        }),
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)' }),
              animate(
                '0.200s ease-in-out',
                style({ transform: 'translateX(0%)' })
              ),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate(
                '0.200s ease-in-out',
                style({ transform: 'translateX(-100%)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-HLTMW3M19H"></script>
export class AppComponent implements OnInit {
  isLoggedOut$: Observable<boolean>;
  User$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private token: AuthTokenService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      //Client side execution
      this.injectScripts();
    }
  }

  ngOnInit(): void {
    initTE({ Lightbox });
    this.isLoggedOut$ = this.afAuth.authState.pipe(
      map((loggedIn) => !loggedIn)
    );
  }

  title = 'Tokyo Cinema';
  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
  injectScripts() {
    const gtmScriptTag = this.renderer.createElement('script');
    gtmScriptTag.type = 'text/javascript';
    gtmScriptTag.src =
      'https://www.googletagmanager.com/gtag/js?id=G-HLTMW3M19H';
    this.renderer.appendChild(this._document.body, gtmScriptTag);

    const gtagInitScript = this.renderer.createElement('script');
    gtagInitScript.type = 'text/javascript';
    gtagInitScript.text = `
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-HLTMW3M19H');
    `;
    this.renderer.appendChild(this._document.body, gtagInitScript);
  }
}
