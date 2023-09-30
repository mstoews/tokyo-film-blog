import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'app/4.services/auth/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit {
  constructor(
    
    public auth: AngularFireAuth,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private route: Router,

  ) {
    
  }
  isToggle: number = 1;
  isLoggin = false;
  status: boolean = false;
    clickEvent() {
        this.status = !this.status;
    }

  userId: string;
  userEmail: string;
  show_admin_menu = false;
  cartCount = 0;
  side = false;

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDrawerOpen: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDrawerSide: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDrawerOver: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.userEmail = user?.email;
      this.isLoggin = true;
      console.debug('User Email: ' + this.userEmail);
    });
  }


  onClose() {
    // if (this.side === true) {
      this.notifyParentCloseDrawer.emit();
    //}
  }


  setMenuMode(){
    if (this.side === true) {
      this.side = false;
      this.notifyParentDrawerOver.emit();
    }
    else {
      this.side = true;
      this.notifyParentDrawerSide.emit();
    }
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

  onProfile() {
    this.route.navigate(['/home/profile']);
    this.notifyParentCloseDrawer.emit();
  }

}
