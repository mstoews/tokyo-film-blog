import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { onMainContentChange } from '../../animations';
import { Location } from '@angular/common';

import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AuthService } from 'app/services/auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CartService } from 'app/services/cart.service';
import { WishListService } from 'app/services/wishlist.service';


@Component({
  selector: 'land-header',
  templateUrl: './landing.header.component.html',
  animations: [onMainContentChange],

})
export class LandingHeaderComponent implements OnInit{
  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter()


  constructor (
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

  @Input() title : string;
  @Input() sub_title : string;
  @Input() back = true;
  @Input() home: boolean;
  isClicked = false;
  doAnimation = false;
  isLoggedIn = true;
  wishCount = 0;
  cartCount = 0;
  isAdmin = false;m

  async ngOnInit(){

    this.authService.getAuth().subscribe( res => {
      if (res !== true) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.cartService.cartByStatus(this.authService.userData.uid, "open").subscribe(cart => {
          this.cartCount = cart.length;
        });

        this.wishListService.wishListByUserId(this.authService.userData.uid).subscribe(wishlist => {
          this.wishCount = wishlist.length;
        });
      }
     })
    await this.isAdminUser();
  }

  async isAdminUser() {
      this.isAdmin = await this.authService.isAdmin();
  }


  public onToggleSideNav() {
    this.menuToggle.setDrawerState(true);
    this.notifyNavBarToggleMenu.emit();

  }

  public onBack(){
    this._location.back()
  }

  public onHome(){
    this._router.navigate(['/home']);
  }

  onShop() {
    this._router.navigate(['/shop']);
  }

  doAnimate() {

  }

  onProfile() {
    this._router.navigate(['/profile']);
  }

  openShoppingCart() {
    this._router.navigate(['shop/cart', this.authService.userData.uid]);
  }

  openWishList() {
    this._router.navigate(['shop/wishlist', this.authService.userData.uid]);
  }


}
