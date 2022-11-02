import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { onMainContentChange } from './animations';
import { AuthService } from 'app/services/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [onMainContentChange],
})
export class ShellComponent implements OnInit {
  loading = false;
  public onSideNavChange = false;
  showFiller = false;
  isLoggedIn: boolean;
  loggedInUser: string;

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
  bSideNavMenu!: boolean;
  divClicked = false;
  isClicked = false;
  doAnimation = false;

  ngOnInit() {
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


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  doAnimate() {
    if (this.doAnimation === true) {
      this.doAnimation = false;
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public router: Router) {}


  onToggleMenu() {
    if (this.isClicked === false) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }
    this.drawer.toggle();
  }

  closeDrawer() {
    this.drawer.close();
  }

  logout() {
    this.loading = true;
    this.authService.SignOut();
    this.loading = false;
  }

  login() {
    // this.router.navigate(["authenication/sign-in/classic"]);
  }
}
