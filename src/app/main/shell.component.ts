import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { onMainContentChange } from './animations';
import { AuthService } from 'app/services/auth/auth.service'
import { Router } from '@angular/router';
import { CartService } from 'app/services/cart.service';
import { WishListService } from 'app/services/wishlist.service';

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
  private cartCount = 0;
  private wishCount = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private cartService: CartService,
    private wishListService: WishListService,
    public router: Router) {}


  ngOnInit() {
       this.authService.getAuth().subscribe( res => {
        if (res === true)
        {
          this.isLoggedIn = true;
          //console.log(this.authService.userData.uid);
          this.cartService.cartByUserId(this.authService.userData.uid).subscribe(cart => {
            this.cartCount = cart.length;
          })

          this.wishListService.wishListByUserId(this.authService.userData.uid).subscribe(wishlist => {
            this.wishCount = wishlist.length;
          })

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
    this.drawer.mode = "over";
  }

  openDrawer() {
    this.drawer.open();
    this.drawer.mode = "side";
  }

  logout() {
    this.loading = true;
    this.authService.SignOut();
    this.loading = false;
  }

  login() {
    // this.router.navigate(["authenication/sign-in/classic"]);
  }
  openShoppingCart() {

    this.router.navigate(['shop/cart', this.authService.userData.uid]);
  }

  openWishList() {
    this.router.navigate(['shop/wishlist', this.authService.userData.uid]);
  }
}
