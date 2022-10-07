import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {AuthService} from 'app/services/auth/auth.service';

@Component({
  selector: 'sign-out-fullscreen',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SignOutFullscreenComponent {
  countdown: number = 5;
  countdownMapping: any = {'=1': '# second', 'other': '# seconds'};

  /**
   * Constructor
   */
  constructor(private _router: Router) {}
}
