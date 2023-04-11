import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { onMainContentChange } from '../../animations';
import { Location } from '@angular/common';
import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AuthService } from 'app/services/auth/auth.service';
import { CartService } from 'app/services/cart.service';
import { WishListService } from 'app/services/wishlist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'app/services/auth/user.service';

@Component({
  selector: 'land-header',
  templateUrl: './landing.header.component.html',
  animations: [onMainContentChange],
})
export class LandingHeaderComponent implements OnInit {
  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private _location: Location,
    private _router: Router,
    private menuToggle: MenuToggleService,
    private afAuth: AngularFireAuth,
    public userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private wishListService: WishListService
  ) {
    this.title = 'Add Title as Parameter in the Template';
    menuToggle.setDrawerState(false);
  }

  @Input() title: string;
  @Input() sub_title: string;
  @Input() back = true;
  @Input() home: boolean;
  @Input() userName: string;
  headerEmail: string;
  isClicked = false;
  doAnimation = false;
  wishCount = 0;
  cartCount = 0;
  isAdmin = false;
  userId = '';

  async ngOnInit() {
    
    this.afAuth.currentUser.then((user) => {
      if (user !== null || user !== undefined) {
        if (user) {
          this.userId = user.uid;
          this.headerEmail = user.email;
        } else {
          this.headerEmail = '';
        }
      }
   

    // this.headerEmail = await this.userService.getUserEmail();
    if(this.userId !== ''){
    this.cartCount = this.cartService.cartCountByUserId(this.userId
    );

    this.wishCount = this.wishListService.wishCountByUserId( this.userId );
    }
  });

  }

  public onToggleSideNav() {
    this.menuToggle.setDrawerState(true);
    this.notifyNavBarToggleMenu.emit();
  }

  public onBack() {
    this._location.back();
  }

  public onHome() {
    this._router.navigate(['/home']);
  }

  onShop() {
    this._router.navigate(['/shop']);
  }

  doAnimate() {}

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
