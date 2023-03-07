import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit 
{
  private userId: string;
  public isRegistered: boolean = true;

  constructor(private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth
  )
  {
    this.userId = authService.userId;
    this.authService.isLoggedIn$.subscribe(loggedin => {
      console.debug('Subscribed is logged in: ', loggedin)
    })
  }

  ngOnInit(){
    let currentUser: any;

    this.afAuth.currentUser.then( user => {
        console.log(`User data ${user}`);
        currentUser = user;
        if (currentUser.isAnonymous !== null){
        if (currentUser.isAnonymous === true){
          this.isRegistered = false;
          console.debug(`this user : ${this.userId} is registered ? :  ${this.isRegistered}`);
        }
      }
    })
  }

  backToHome() {
    this.router.navigate(['home'])
  }
    
}
