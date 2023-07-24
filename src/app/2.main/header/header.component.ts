import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
  signal,
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
import { Observable, Subscription, first } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [onMainContentChange],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  country: string;
  constructor() {}

  private _router = inject(Router);
  private menuToggle = inject(MenuToggleService);
  private authService = inject(AuthService);
  private afAuth = inject(AngularFireAuth);
  public userService = inject(UserService);
  private cartService = inject(CartService);
  private wishListService = inject(WishListService);
  private profile = inject(ProfileService);
  private afs = inject(AngularFirestore);
  private snackBar = inject(MatSnackBar);
  private _location = inject(Location);

  @Input() title: string;
  @Input() sub_title: string;
  @Input() back = true;
  @Input() home: boolean;
  isClicked = false;
  emailName: string;
  profile$: Observable<ProfileModel[]>;
  userId: string;

  isLoggedIn = true;
  wishCounter = signal<number>(0);
  cartCounter = signal<number>(0);
  subUserService: Subscription;
  subCartService: Subscription;
  subWishListService: Subscription;
  subAuth: Subscription;

  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.menuToggle.setDrawerState(false);
    this.emailName = 'Guest';
    this.subUserService = this.userService.isLoggedIn$.subscribe((res) => {
      if (res === true) {
        this.isLoggedIn = true;

        this.subCartService = this.cartService
          .cartByStatus(this.authService.userData.uid, 'open')
          .subscribe((cart) => {
            this.cartCounter.set(cart.length);
          });

        this.subWishListService = this.wishListService
          .wishListByUserId(this.authService.userData.uid)
          .subscribe((wishlist) => {
            this.wishCounter.set(wishlist.length);
          });
      } else {
        this.isLoggedIn = false;
      }
    });

    this.subAuth = this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.debug(this.userId);

        let collection = this.afs.collection<ProfileModel>(
          `users/${this.userId}/profile`
        );
        const profiles = collection.valueChanges({ idField: 'id' });

        profiles.pipe(first()).subscribe((ref) => {
          if (ref.length > 0)
            ref.forEach((mr) => {
              console.debug(mr);
              // this.emailName = mr.first_name.charAt(0) + mr.last_name.charAt(0);
              this.emailName = mr.first_name;
              this.country = mr.country;
              this.authService.setUserName(mr.first_name);
            });
          else {
            this.emailName = 'Guest';
            this.authService.setUserName(this.emailName);
          }
        });
        this.emailName = 'Guest';
        this.authService.setUserName('');
      } else {
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
    this.subUserService = this.userService.isLoggedIn$.subscribe((user) => {
      if (user === false) {
        this.snackBar.open('Please sign in to access the cart', 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        });
        this._router.navigate(['profile']);
      } else {
        this._router.navigate(['shop/cart', this.userId]);
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
        console.debug('User ID: ' + this.userId);
        this._router.navigate(['shop/wishlist', this.userId]);
      }
    });
  }

  ngOnDestroy(): void {
    //this.subUserService.unsubscribe();
    //this.subCartService.unsubscribe();
    //this.subWishListService.unsubscribe();
  }
}
