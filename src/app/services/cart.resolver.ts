import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable()
export class CartResolver implements Resolve<Cart[] | undefined> {
  constructor(private cartService: CartService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cart[] | undefined> {
    const id = route.paramMap.get('id') as string;
    const rc = this.cartService.cartByUserId(id);
    return rc;
  }
}
