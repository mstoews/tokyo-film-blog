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
  private userId: string;
  pictureUrl$: Observable<string | null>

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter()

  constructor(
    private authService: AuthService,
    private route: Router

    ) {

    this.authService.afAuth.authState.subscribe((user) => {
          this.userId = user?.uid;
    })

    this.isLoggedIn$ = this.authService.afAuth.authState.pipe(
      map((user) => !!user)
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

  public getUserId() {
    return this.userId
  }

  onWishList(){
    if (this.userId == undefined )
    {
      this.route.navigate(['/authentication/sign-in/classic']);
    }
    this.route.navigate(['/shop/', this.userId])
    this.notifyParentCloseDrawer.emit()
  }

  onShop(){
    if (this.userId == undefined )
    {
      this.route.navigate(['/authentication/sign-in/classic']);
    }
    this.route.navigate(['/shop/wishlist/', this.userId])
    this.notifyParentCloseDrawer.emit()
  }


  onClose() {
    // console.log('Sidenav emit close');
    this.notifyParentCloseDrawer.emit()
  }
}
