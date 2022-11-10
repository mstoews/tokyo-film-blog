import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService)
  {

  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe( res => {
      if (res === true)
      {
        this.isLoggedIn = true;
      }
      else
      {
        this.isLoggedIn = false;
      }
     })
  }

  onClose(){
    console.log('Sidenav emit close');
    this.notifyParentCloseDrawer.emit();
  }

}

