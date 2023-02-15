import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Router, RouterLink, RouterModule } from '@angular/router';

import { onMainContentChange } from '../animations';
import { Location } from '@angular/common';

import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AuthService } from 'app/services/auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CartService } from 'app/services/cart.service';
import { WishListService } from 'app/services/wishlist.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [onMainContentChange],

})
export class HeaderComponent implements OnInit {

  constructor(
    private _location: Location,
    private _router: Router,
    private menuToggle: MenuToggleService,
    private authService: AuthService,
    private cartService: CartService,
    private wishListService: WishListService,
  ) {
    this.title = "Add Title as Parameter in the Template";
    menuToggle.setDrawerState(false);
  }

  @Input() title: string;
  @Input() sub_title: string;
  @Input() back = true;
  @Input() home: boolean;
  isClicked = false;

  isLoggedIn = true;
  wishCount = 0;
  cartCount = 0;
  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter()

  ngOnInit() {
    this.authService.getAuth().subscribe(res => {
      if (res === true) {
        this.isLoggedIn = true;

        this.cartService.cartByStatus(this.authService.userData.uid, 'open').subscribe(cart => {
          this.cartCount = cart.length;
        })

        this.wishListService.wishListByUserId(this.authService.userData.uid).subscribe(wishlist => {
          this.wishCount = wishlist.length;
        })

      }
      else {
        this.isLoggedIn = false;
      }
    })
  }

  public onToggleSideNav() {
    this.menuToggle.setDrawerState(true);
    this.notifyNavBarToggleMenu.emit();

  }

  onLogout() {
    this._router.navigate(['/authentication/signout/modern']);
  }
  onLogin() {
    this._router.navigate(['/authentication/signin/modern']); 
  }

  onProfile() {
    this._router.navigate(['/profile']); 
  }

  onThoughts() {
    this._router.navigate(['/collections']);
  }
  onCollections() {
    this._router.navigate(['/blog']);
  }

  onBack() {
    this._location.back()
  }

  public onHome() {
    this._router.navigate(['/home']);
  }

  onShop() {
    this._router.navigate(['/shop']);
  }

  doAnimate() {

  }

  openShoppingCart() {
    this._router.navigate(['shop/cart', this.authService.userData.uid]);
  }

  openWishList() {
    this._router.navigate(['shop/wishlist', this.authService.userData.uid]);
  }


}
