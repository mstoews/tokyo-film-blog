import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/4.services/auth/auth.service';
import { UserService } from 'app/4.services/auth/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private route: Router,
    public user: UserService
  ) {
    this.authService.afAuth.authState.subscribe((user) => {
      this.userEmail = user?.email;
      console.log('User Email: ' + this.userEmail);
    });
  }

  userId: string;
  userEmail: string;
  show_admin_menu = false;
  cartCount = 0;

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDrawerOpen: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;}
      });

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
    this.userService.isLoggedIn$.subscribe((user) => {
      if (user === false) {
        this.snackBar.open('Please sign in to access the wish list', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'bg-danger',
          duration: 3000,
        });
        this.route.navigate(['profile']);
      } else {
        this.auth.authState.subscribe((user) => {
          if (user) {
            this.userId = user.uid;}
            this.route.navigate(['/shop/wishlist/', this.userId]);
            this.notifyParentCloseDrawer.emit();
          });
      }
    });
  }

  onCart() {
    this.userService.isLoggedIn$.subscribe((user) => {
      if (user === false) {
        this.snackBar.open('Please sign in to access the cart', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        });
        this.route.navigate(['profile']);
      } else {
        this.route.navigate(['/shop/cart/', this.userId]);
        this.notifyParentCloseDrawer.emit();
      }
    });
  }

  onClose() {
    this.notifyParentCloseDrawer.emit();
  }
}
