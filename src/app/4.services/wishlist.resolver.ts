import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WishList } from '../5.models/wishlist';
import { Observable } from 'rxjs';
import { WishListService } from './wishlist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class WishListResolver  {
  constructor(private cartService: WishListService) {}
  auth = inject(AngularFireAuth);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WishList | undefined> {
    return this.cartService.wishListByUserId(route.paramMap.get('id'));
  }
}
