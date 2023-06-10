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

import { MenuToggleService } from 'app/4.services/menu-toggle.service';
import { AuthService } from 'app/4.services/auth/auth.service';

import { CartService } from 'app/4.services/cart.service';
import { WishListService } from 'app/4.services/wishlist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileService } from 'app/4.services/profile.service';
import { ProfileModel } from 'app/5.models/profile';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'app/4.services/auth/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, first } from 'rxjs';

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
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
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
      if (user) {
        const userId = user.uid;

        let collection = this.afs.collection<ProfileModel>(
          `users/${userId}/profile`
        );
        const profiles = collection.valueChanges({ idField: 'id' });

        profiles.pipe(first()).subscribe((ref) => {
          if (ref.length > 0)
            ref.forEach((mr) => {
              console.debug(mr);
              // this.emailName = mr.first_name.charAt(0) + mr.last_name.charAt(0);
              this.emailName = mr.first_name;
              this.authService.setUserName(mr.first_name);
            });
          else {
            this.emailName = 'Guest';
            this.authService.setUserName(this.emailName);
          }
        });
        this.emailName = 'Guest';
        this.authService.setUserName('');
      }
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
    this.userService.isLoggedIn$.subscribe((user) => {
      if (user === false) {
        this.snackBar.open('Please sign in to access the cart', 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        });
        this._router.navigate(['profile']);
      } else {
        this._router.navigate(['shop/cart', this.authService.userData.uid]);
      }
    });
  }

  openWishList() {
    this.userService.isLoggedIn$.subscribe((user) => {
      if (user === false) {
        this.snackBar.open('Please sign in to access the wish list', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        });
        this._router.navigate(['profile']);
      } else {
        this._router.navigate(['shop/wishlist', this.authService.userData.uid]);
      }
    });
  }
}
