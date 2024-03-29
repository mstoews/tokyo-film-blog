import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { onMainContentChange } from '../../animations';
import { Location } from '@angular/common';
import { MenuToggleService } from 'app/4.services/menu-toggle.service';
import { AuthService } from 'app/4.services/auth/auth.service';
import { CartService } from 'app/4.services/cart.service';
import { WishListService } from 'app/4.services/wishlist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'app/4.services/auth/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'land-header',
  templateUrl: './landing.header.component.html',
  animations: [onMainContentChange],
})
export class LandingHeaderComponent implements OnInit, OnDestroy {
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

  wishCounter = signal<number>(0);
  cartCounter = signal<number>(0);

  _unsubscribeAll: Subject<any> = new Subject<any>();


  ngOnInit() {
    this.userService.isLoggedIn$.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
      if (res === true) {
        this.authService.afAuth.authState.pipe(takeUntil(this._unsubscribeAll)).subscribe((user) => {
          this.userId = user?.uid;
          this.cartCounter.set(this.cartService.cartCountByUserId(this.userId));
          this.wishCounter.set(this.wishListService.wishCountByUserId(this.userId));
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  public onToggleSideNav() {
    if (this.menuToggle.getDrawerState() === true) {
      this.menuToggle.setDrawerState(false);
      this.notifyNavBarToggleMenu.emit();
    }
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
