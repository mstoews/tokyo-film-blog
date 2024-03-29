import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cart } from '../5.models/cart';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable()
export class CartResolver  {
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
