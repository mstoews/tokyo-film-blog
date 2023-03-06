import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent
{
  private userId: string;
  public isRegistered: boolean = true;
  backToHome() {
    this.router.navigate(['home'])
  }
 
    constructor(private router: Router,
      private authService: AuthService)
    {
      this.userId = authService.userId;
      let currentUser: any;
      authService.afAuth.currentUser.then( user => {
          currentUser = user;
          if (currentUser.isAnonymous === true){
            this.isRegistered = false;
            console.log(`this user : ${this.userId} is registered ? :  ${this.isRegistered}`)
          }
      })
      console.log('User id profile: ', this.userId);
      this.authService.isLoggedIn$.subscribe(loggedin => {
        console.log('Subscribed is logged in: ', loggedin)
      })
    }
}
