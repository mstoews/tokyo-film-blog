import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { UserService } from 'app/services/auth/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private route: Router,
    public user: UserService
  ) {
    this.authService.afAuth.authState.subscribe((user) => {
      this.userEmail = user?.email;
    });
  }

  userId = this.authService.afAuth.authState;
  userEmail: string;
  show_admin_menu = false;
  cartCount=0;

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDrawerOpen: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    
  }

  onAdmin() {
    if (this.show_admin_menu === false) {
      this.show_admin_menu = true;
      this.notifyParentDrawerOpen.emit();
    } else {
      this.show_admin_menu = false;
      this.notifyParentCloseDrawer.emit();
      this.route.navigate(['home']);
    }
  }

  onShop() {
    this.route.navigate(['shop']);
    this.notifyParentCloseDrawer.emit();
  }

  onWishList() {
    this.route.navigate(['/shop/wishlist/', this.userId]);
    this.notifyParentCloseDrawer.emit();
  }

  onCart() {
    // }
    this.route.navigate(['/shop/cart/', this.userId]);
    this.notifyParentCloseDrawer.emit();
  }

  onClose() {
    this.notifyParentCloseDrawer.emit();
  }
}
