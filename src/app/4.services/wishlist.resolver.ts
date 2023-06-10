import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { WishList } from '../5.models/wishlist';
import { Observable } from 'rxjs';
import { WishListService } from './wishlist.service';

@Injectable()
export class WishListResolver implements Resolve<WishList | undefined> {
  constructor(private cartService: WishListService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WishList | undefined> {
    const id = route.paramMap.get('userId') as string;
    return this.cartService.wishListByUserId(id);
  }
}
