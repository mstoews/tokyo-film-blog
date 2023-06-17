import { Injectable, computed, signal } from '@angular/core';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map, Observable, of } from 'rxjs';
import { Cart } from 'app/5.models/cart';
import { Product } from 'app/5.models/products';
import { convertSnaps } from './db-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth/auth.service';
import { WishList } from 'app/5.models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCollection: AngularFirestoreCollection<Cart>;
  isLoggedIn: boolean;
  userId: string;
  cart$: Observable<Cart[]>;
  cartItems$: Observable<Cart[]>;
  cartCounter: number;
  userCountry: string;
  // Manage state with signals
  cartItem = signal<Cart[]>([]);

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public authService: AuthService,
    private snack: MatSnackBar
  ) {
    auth.authState.subscribe((user) => {
      this.userId = user?.uid;
    });

    this.auth.authState.pipe(map((user) => !!user)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.cartItems$ = this.cartCollection.valueChanges({ idField: 'id' });
    }
  }

  getCartCount(userId: string): Observable<Cart[] | undefined> {
    return this.afs
      .collection(`users/${userId}/cart`)
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Cart>(snaps);
        })
      );
  }

  getCartItem(userId: string, productId: string): Observable<Cart[]> {
    return this.afs
      .collection(`users/${userId}/cart`, (ref) =>
        ref.where('product_id', '==', productId)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Cart>(snaps);
        })
      );
  }

  getAll() {
    var cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(`user/${this.userId}/cart`);
    this.cartItems$ = cartItemsCollection.valueChanges({ idField: 'id' });
    return this.cartItems$;
  }

  get(id: string) {
    return this.cartCollection.doc(id).get();
  }

  cartByUserId(userId: string): Observable<Cart[] | undefined> {
    let cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(`users/${userId}/cart`);
    return cartItemsCollection.valueChanges({ idField: 'id' });
  }

  cartByStatus(userId: string, cartStatus: string) {
    let cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(`users/${userId}/cart`);
    let cart = cartItemsCollection.valueChanges({ idField: 'id' });
    return cart.pipe(
      map((cart) => {
        return cart.filter((cart) => {
          return cart.status === cartStatus;
        });
      })
    );
  }

  cartCountByUserId(userId: string): any {
    const cartCount = this.cartByStatus(userId, 'Open');
    cartCount.subscribe((cart) => {
      return of(cart.length);
    });
  }

  findCartByUrl(id: string): Observable<Cart | undefined> {
    return this.afs
      .collection('cart', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const Cart = convertSnaps<Cart>(snaps);
          return Cart.length == 1 ? Cart[0] : undefined;
        }),
        first()
      );
  }

  create(mtCart: Cart) {
    // console.debug('product id:', mtCart.id);
    const collectionRef = this.afs.collection(`users/${this.userId}/cart/`);
    collectionRef.add(mtCart);
    this.snack.open('Selection has been added to your cart ...', 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
      duration: 3000,
    });
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

  addToCart(productId: string) {
    let userId = this.userId;
    let prod = this.findProductById(productId);
    if (prod) {
      prod.subscribe((result) => {
        const cart: Cart = {
          ...result,
          product_id: productId,
          is_completed: false,
          user_purchased: userId,
          date_sold: Timestamp.now(),
          date_updated: Timestamp.now(),
          status: 'open',
          quantity: 1,
        };
        this.create(cart);
      });
    }
  }

  addToCartWithQuantity(productId: string, quantity: number) {
    let userId = this.userId;
    let prod = this.findProductById(productId);
    if (prod) {
      prod.subscribe((result) => {
        const cart: Cart = {
          ...result,
          product_id: productId,
          is_completed: false,
          user_purchased: userId,
          date_sold: Timestamp.now(),
          date_updated: Timestamp.now(),
          quantity: quantity,
          status: 'open',
        };
        this.create(cart);
      });
      let wishlistItems: Observable<WishList[]>;
      let wishlistCollection: AngularFirestoreCollection<WishList>;
      wishlistCollection = this.afs.collection<WishList>(
        `users/${this.userId}/wishlist`
      );
      wishlistItems = wishlistCollection.valueChanges({ idField: 'id' });
      wishlistCollection.doc(productId).delete();
    }
  }

  update(mtCart: Cart) {
    this.cartCollection.doc(mtCart.id.toString()).update(mtCart);
    this.snack.open('Cart has been updated ... ', 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
    });
  }

  delete(id: string) {
    var cartItems: Observable<Cart[]>;
    var cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(
      `users/${this.userId}/cart`
    );
    cartItems = cartItemsCollection.valueChanges({ idField: 'id' });
    cartItemsCollection.doc(id).delete();
    this.snack.open('Item has been removed ... ', 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
    });
  }
}
