import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { AuthService } from 'app/services/auth/auth.service'
import { UserService } from 'app/services/auth/user.service'
import { map, Observable } from 'rxjs'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit{
  public isLoggedIn$: Observable<boolean>
  public isLoggedOut$: Observable<boolean>
  loggedIn = false

  admin_login = false;
  private userId: string;
  userEmail: string;
  show_admin_menu = false;
  isLoggedIn = false;
  pictureUrl$: Observable<string | null>

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter()
  @Output() notifyParentDrawerOpen: EventEmitter<any> = new EventEmitter()


  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private route: Router,
    public user: UserService
    ) {
    
    this.authService.afAuth.authState.subscribe((user) => {
          this.userId = user?.uid;
          this.userEmail = user?.email    
    })

    this.isAdminUser();

  }

  async ngOnInit() {

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
  
    this.isAdminUser();
  } 

  isAdminUser() {
    console.log('Is admin ', this.admin_login);
  
    if (this.userEmail === 'mstoews@hotmail.com'  ||  this.userEmail === 'cassandra_haruma@hotmail.com') {
      console.log('sidenav admin user is true');
     this.admin_login = true;
    }
}

  onAdmin()
  {
    if (this.show_admin_menu === false) {
      this.show_admin_menu = true;
      this.notifyParentDrawerOpen.emit();

    } else
    {
      this.show_admin_menu = false;
      this.notifyParentCloseDrawer.emit()
      this.route.navigate(['home'])
    }

    this.isAdminUser();

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
