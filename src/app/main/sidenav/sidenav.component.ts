import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/services/auth/auth.service'
import { map, Observable } from 'rxjs'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent {
  public isLoggedIn$: Observable<boolean>
  public isLoggedOut$: Observable<boolean>
  loggedIn = false
  admin = false;
  admin_login = false;
  private userId: string;
  pictureUrl$: Observable<string | null>

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter()
  @Output() notifyParentDrawerOpen: EventEmitter<any> = new EventEmitter()


  constructor(
    private authService: AuthService,
    private route: Router

    ) {
    this.authService.afAuth.authState.subscribe((user) => {
          this.userId = user?.uid;
          if (this.userId === 'cW5vCsElpETTpUJgT6UEDRSxadq2' || this.userId === 'Ttxdl5aFWedoNAgGJ0MRFDaRv6M2' ) {
            this.admin_login = true;
          } 
    })

    this.isLoggedIn$ = this.authService.afAuth.authState.pipe(
      map((user) => { !!user;
        if(user){
        this.userId = user.uid;
        return true;
        } else
        return false;
      })
    )

    this.isLoggedIn$.subscribe((user) => {
      this.loggedIn = user
    })

    this.isLoggedOut$ = this.authService.afAuth.authState.pipe(
      map((loggedIn) => !!loggedIn)
    )

    this.pictureUrl$ = this.authService.afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    )
  }

  onAdmin()
  {
    if (this.admin === false) {
      this.admin = true;
      this.notifyParentDrawerOpen.emit();

    } else
    {
      this.admin = false;
      this.notifyParentCloseDrawer.emit()
      this.route.navigate(['home'])
    }

  }

  public getUserId() {
    return this.userId
  }

  onShop(){
    // if (this.userId == undefined || this.isLoggedOut$) {
    //   this.route.navigate(['/authentication/sign-in/classic']);
    //   this.onClose();
    //   return;
    // }
    this.route.navigate(['shop'])
    this.notifyParentCloseDrawer.emit()
  }

  onWishList(){
    // if (this.userId == undefined ) {
    //   this.route.navigate(['/authentication/sign-in/classic']);
    //   this.onClose();
    //   return;
    // }
    this.route.navigate(['/shop/wishlist/', this.userId])
    this.notifyParentCloseDrawer.emit()
  }

  onCart(){
    // if (this.userId == undefined ) {
    //   this.route.navigate(['/authentication/sign-in/classic']);
    //   this.onClose();
    //   return;
    // }
    this.route.navigate(['/shop/cart/', this.userId])
    this.notifyParentCloseDrawer.emit()
  }

  onClose() {
    this.notifyParentCloseDrawer.emit()
  }
}
