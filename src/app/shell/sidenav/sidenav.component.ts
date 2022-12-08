import { Component, EventEmitter, Output } from '@angular/core'
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
  pictureUrl$: Observable<string | null>

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter()

  constructor(private authService: AuthService) {
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

  onClose() {
    // console.log('Sidenav emit close');
    this.notifyParentCloseDrawer.emit()
  }
}
