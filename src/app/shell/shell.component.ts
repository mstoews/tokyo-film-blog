import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MaterialModule } from '../MaterialModule';
import { onMainContentChange } from './animations';
import { IconsModule } from '../icons.module';
import { CommonModule } from '@angular/common';
import { StaticSidebarComponent } from './static-sidebar/static-sidebar.component';

@Component({
  standalone: true,
  imports: [MaterialModule, IconsModule, CommonModule, StaticSidebarComponent],
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  animations: [onMainContentChange],
})
export class ShellComponent implements AfterViewInit {
  loading = false;
  public onSideNavChange = false;

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
  bSideNavMenu!: boolean;
  divClicked = false;
  isClicked = false;
  doAnimation = false;
  // envConnected: string = localStorage.getItem('env');
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
    // private afAuth: AuthService,
     // private sidenavService: MenuService
  ) {
    // this.sidenavService.sideNavState$.subscribe((result) => {

    //   this.onSideNavChange = result;
    // });
  }

  ngAfterViewInit(): void {}

  onToggleMenu() {
    if (this.isClicked === false) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }
    this.drawer.toggle();
  }

  logout() {
    this.loading = true;
    // this.afAuth.logout();
    this.loading = false;
  }
}
