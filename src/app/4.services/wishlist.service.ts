import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { WishList } from 'app/5.models/wishlist';
import { Cart } from 'app/5.models/cart';
import { convertSnaps } from './db-utils';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Product } from 'app/5.models/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuToggleService } from './menu-toggle.service';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import { OrderByDirection } from 'firebase/firestore';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

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
    private auth: AngularFireAuth,
    private cartService: CartService,
    private menuToggleService: MenuToggleService,
    private route: Router
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
    //}
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

  findCartItemByProductId(productId: string): any {
    this.afs
      .collection(`users/${this.userId}/cart/`, (ref) =>
        ref.where('product_id', '==', productId)
      )
      .get()
      .pipe(
        map((snaps) => {
          snaps.forEach((cart) => {
            // console.debug('Found the item in the cart: ', cart.ref.id);
            return true;
          });
        })
      );
    return false;
  }

  create(mtProduct: WishList): void {
    // console.debug('product id:', mtProduct.id);
    if (this.findWishListItemById(mtProduct.id)) {
      const collectionRef = this.afs.collection(
        `users/${this.userId}/wishlist/`
      );
      // create an api call to the server to create the wish list on the userId
      // if the users is not logged in create a user id from an anonymous login.
      collectionRef.add(mtProduct);
      this.snack.open('Wish list has been added ...', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
        duration: 3000,
      });
    }
  }

  isProductInCart(productId: string): boolean {
    return this.findCartItemByProductId(productId);
  }

  isProductInWishList(productId: string): boolean {
    const collectionRef = this.afs.collection(
      `users/${this.userId}/wishlist/${productId}/id`
    );
    const wishlistId = collectionRef.get();
    if (wishlistId) {
      this.snack.open('Item is already in your wishlist... ', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
      });
      return true;
    } else {
      return false;
    }
  }

  getProductInCart(productId: string, userId: string): any {
    let found = false;
    let product: Observable<Cart[]>;
    let productCollection: AngularFirestoreCollection<Cart>;
    productCollection = this.afs.collection<Cart>(`users/${userId}/cart`);
    product = productCollection.valueChanges({ idField: 'id' });
    product.pipe(
      map((cart) =>
        cart.filter((product) => {
          product.product_id === productId;
        })
      )
    );
  }

  findCart(
    productId: string,
    userId: string,
    sortOrder: OrderByDirection = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Cart[]> {
    return this.afs
      .collection(`users/${userId}/cart`, (ref) =>
        ref
          .orderBy('description', sortOrder)
          .limit(pageSize)
          .startAfter(pageNumber * pageSize)
      )
      .get()
      .pipe(map((results) => convertSnaps<Cart>(results)));
  }

  addToCartFromWishList(productId: string, quantity: number) {
    if (this.isProductInCart(productId) === false) {
      let prod = this.findProductById(productId);

      if (prod) {
        prod.subscribe((result) => {
          result.quantity_required === true
            ? this.route.navigate(['/shop/product', productId])
            : this.cartService.addToCartWithQuantity(productId, quantity);
        });
      }
    }
    return true;
  }

  addToCart(productId: string, quantity: number) {
    if (this.isProductInCart(productId) === false) {
      this.cartService.addToCartWithQuantity(productId, quantity);
    }
  }

  wishListByUserId(userId: string): any {
    let col: AngularFirestoreCollection<WishList>;
    col = this.afs.collection<WishList>(`users/${userId}/wishlist`);
    return col.valueChanges({ idField: 'id' });
  }

  wishCountByUserId(userId: string) {
    const wishListItems = this.wishListByUserId(userId);
    return wishListItems.length;
  }

  update(mtProduct: WishList) {
    this.wishListCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    let wishlistItems: Observable<WishList[]>;
    let wishlistCollection: AngularFirestoreCollection<WishList>;
    wishlistCollection = this.afs.collection<WishList>(
      `users/${this.userId}/wishlist`
    );
    wishlistItems = wishlistCollection.valueChanges({ idField: 'id' });
    wishlistCollection.doc(id).delete();
  }
}
