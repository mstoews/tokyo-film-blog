import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@made-to/animations';
import { AuthService } from 'app/4.services/auth/auth.service';

@Component({
  selector: 'sign-out-fullscreen-reversed',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignOutFullscreenReversedComponent {
  countdown: number = 5;
  countdownMapping: any = { '=1': '# second', other: '# seconds' };
  constructor(private _authService: AuthService, private _router: Router) {}
}
