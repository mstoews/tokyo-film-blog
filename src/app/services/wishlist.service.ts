import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { WishList } from 'app/models/wishlist';
import { Cart } from 'app/models/cart';

import { convertSnaps } from './db-utils';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Product } from 'app/models/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import { collection } from 'firebase/firestore';
import { FuseAlertService } from '@fuse/components/alert';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private wishListCollection: AngularFirestoreCollection<WishList>;
  private wishListItems: Observable<WishList[]>;
  private isLoggedIn: boolean;
  private userId: string;

  constructor(
    private afs: AngularFirestore,
    private snack: MatSnackBar,
    private auth: AngularFireAuth
  ) {
    auth.authState.subscribe((user) => {
      this.userId = user?.uid;
    });

    this.auth.authState.pipe(map((user) => !!user)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.wishListItems = this.wishListCollection.valueChanges({
        idField: 'id',
      });
    }
  }

  getAll() {
    return this.wishListItems;
  }

  getCurrentUserId() {
    return this.userId;
  }

  get(id: string) {
    return this.wishListCollection.doc(id).get();
  }

  createWishList(productId: string) {
    if (this.isProductInCart(productId) === false)
    if (this.isProductInWishList(productId) === false)
    {
    let prod = this.findProductById(productId);
    if (prod) {
      prod.subscribe((result) => {
        const wish: WishList = {
          ...result,
          product_id: result.id,
        };
        this.create(wish);
      });
    }
  }
  }

  createCart(productId: string) {
    let prod = this.findProductById(productId);
    if (prod) {
      prod.subscribe((result) => {
        const wish: WishList = {
          ...result,
          product_id: result.id,
        };
        this.create(wish);
      });
    }
  }

  findWishListById(id: string): Observable<WishList | undefined> {
    return this.afs
      .collection(`users/${this.userId}/wishlist`, (ref) =>
        ref.where('id', '==', id)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const product = convertSnaps<WishList>(snaps);
          return product.length == 1 ? product[0] : undefined;
        }),
        first()
      );
  }

  findProductById(id: string): Observable<Product | undefined> {
    return this.afs
      .collection('inventory', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const product = convertSnaps<Product>(snaps);
          return product.length == 1 ? product[0] : undefined;
        }),
        first()
      );
  }

  findWishListItemById(id: string): Observable<WishList | undefined> {
    return this.afs
      .collection(`users/${this.userId}/wishlist/`, (ref) =>
        ref.where('id', '==', id)
      )
      .valueChanges()
      .pipe(
        map((snaps) => {
          const wishlist = convertSnaps<WishList>(snaps);
          return wishlist.length == 1 ? wishlist[0] : undefined;
        }),
        first()
      );
  }

  findCartItemByProductId(productId: string): Observable<Cart | undefined> {
    return this.afs.collection(`users/${this.userId}/cart/`, (ref) =>
      ref.where('product_id', '==', productId)
    )
    .valueChanges()
    .pipe(
      map((snaps) => {
        const cart = convertSnaps<Cart>(snaps);
        return cart.length == 1 ? cart[0] : undefined;
      }),
      first()
    );
  }

  create(mtProduct: WishList): void {
    console.log('product id:', mtProduct.id);
    if (this.findWishListItemById(mtProduct.id)) {
      const collectionRef = this.afs.collection(
        `users/${this.userId}/wishlist/`
      );
      collectionRef.add(mtProduct);
      this.snack.open('Wish list has been added ...', 'Close');
    }
  }

  isProductInCart(productId: string): boolean{
    var productName: string;
    const prd = this.findCartItemByProductId(productId);
    prd.subscribe(cart => {
      productName = cart.description;
    })
    if (prd === undefined)
    {
      return false
    }
    else
    {
      this.snack.open('Item is already in your cart... ', 'Close');
      return true;
    }
  }

  isProductInWishList(productId: string): boolean{
    const collectionRef = this.afs.collection(`users/${this.userId}/wishlist/${productId}/id`);
    const wishlistId = collectionRef.get()
    if (wishlistId){
      this.snack.open('Item is already in your wishlist... ', 'Close');
      return true;
    }
    else
    {
      return false;
    }
  }


  addToCart(productId: string) {
    if(this.isProductInCart(productId) === false) {
    let prod = this.findProductById(productId);
    if (prod) {
      prod.subscribe((result) => {
        const cart: Cart = {
          ...result,
          product_id: productId,
          is_completed: false,
          user_purchased: this.userId,
          date_sold: Timestamp.now(),
          date_updated: Timestamp.now(),
        };
        const collectionRef = this.afs.collection(`users/${this.userId}/cart/`);
        collectionRef.add(cart);
        this.snack.open('Added to your cart... ', 'Close');
      });
    }
      this.delete(productId);
    }
  }

  wishListByUserId(userId: string): any {
    var wishListItems: Observable<WishList[]>;
    var wishListItemsCollection: AngularFirestoreCollection<WishList>;
    wishListItemsCollection = this.afs.collection<WishList>(
      `users/${userId}/wishlist`
    );
    wishListItems = wishListItemsCollection.valueChanges({ idField: 'id' });
    return wishListItems;
  }

  update(mtProduct: WishList) {
    this.wishListCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    var wishlistItems: Observable<WishList[]>;
    var wishlistCollection: AngularFirestoreCollection<WishList>;
    wishlistCollection = this.afs.collection<WishList>(
      `users/${this.userId}/wishlist`
    );
    wishlistItems = wishlistCollection.valueChanges({ idField: 'id' });
    wishlistCollection.doc(id).delete();
  }
}
