import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent
{


  backToHome() {
    this.router.navigate(['home'])
  }
    /**
     * Constructor
     */
    constructor(private router: Router)
    {

    }


}
