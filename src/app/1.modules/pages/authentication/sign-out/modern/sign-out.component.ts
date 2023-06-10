import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/4.services/auth/auth.service';

@Component({
  selector: 'sign-out-modern',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignOutModernComponent {
  countdown: number = 5;
  countdownMapping: any = { '=1': '# second', other: '# seconds' };

  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _router: Router) {}
}
