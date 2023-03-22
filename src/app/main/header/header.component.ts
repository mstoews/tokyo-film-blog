import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Router, RouterLink, RouterModule } from '@angular/router';

import { onMainContentChange } from '../animations';
import { Location } from '@angular/common';

import { MenuToggleService } from 'app/services/menu-toggle.service';
import { AuthService } from 'app/services/auth/auth.service';

import { CartService } from 'app/services/cart.service';
import { WishListService } from 'app/services/wishlist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileService } from 'app/services/profile.service';
import { observable, map, Observable, first } from 'rxjs';
import { ProfileModel } from 'app/models/profile';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'app/services/auth/user.service';

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
    private afAuth: AngularFireAuth,
    public userService: UserService,
    private cartService: CartService,
    private wishListService: WishListService,
    private profile: ProfileService,
    private afs: AngularFirestore
  ) {
    this.title = 'Add Title as Parameter in the Template';
    menuToggle.setDrawerState(false);
  }

  @Input() title: string;
  @Input() sub_title: string;
  @Input() back = true;
  @Input() home: boolean;
  isClicked = false;
  emailName: string;
  profile$: Observable<ProfileModel[]>;

  isLoggedIn = true;
  wishCount = 0;
  cartCount = 0;
  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.emailName = 'Guest';
    this.userService.isLoggedIn$.subscribe((res) => {
      if (res === true) {
        this.isLoggedIn = true;

        this.cartService
          .cartByStatus(this.authService.userData.uid, 'open')
          .subscribe((cart) => {
            this.cartCount = cart.length;
          });

        this.wishListService
          .wishListByUserId(this.authService.userData.uid)
          .subscribe((wishlist) => {
            this.wishCount = wishlist.length;
          });
      } else {
        this.isLoggedIn = false;
      }
    });

    this.authService.afAuth.authState.subscribe((user) => {
      const userId = user.uid;

      let collection = this.afs.collection<ProfileModel>( `users/${userId}/profile` );
      const profiles = collection.valueChanges({ idField: 'id' });

      profiles.pipe(first()).subscribe((ref) => {
        if (ref.length > 0)
          ref.forEach((mr) => {
            console.debug(mr);
            this.emailName = mr.first_name;
            this.authService.setUserName(mr.first_name);
          });
         else {
          this.emailName = 'Guest';
          this.authService.setUserName(this.emailName);
         }
      });
    });

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
    this._router.navigate(['/blog']);
  }
  onCollections() {
    this._router.navigate(['/collections']);
  }

  onBack() {
    this._location.back();
  }

  public onHome() {
    this._router.navigate(['/home']);
  }

  onShop() {
    this._router.navigate(['/shop']);
  }

  doAnimate() {}

  openShoppingCart() {
    this._router.navigate(['shop/cart', this.authService.userData.uid]);
  }

  openWishList() {
    this._router.navigate(['shop/wishlist', this.authService.userData.uid]);
  }
}
