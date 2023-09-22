import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map, Observable, of, Subject, takeUntil, throwError } from 'rxjs';
import { Cart } from 'app/5.models/cart';
import { Product } from 'app/5.models/products';
import { convertSnaps } from './db-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth/auth.service';
import { WishList } from 'app/5.models/wishlist';
import { CollectionReference, DocumentData, collection, getCountFromServer, query, where } from 'firebase/firestore';
import { WishListService } from './wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private cartCollection: AngularFirestoreCollection<Cart>;
  isLoggedIn: boolean;
  userId: string;
  cart$: Observable<Cart[]>;
  cartItems$: Observable<Cart[]>;
  userCountry: string;
  // Manage state with signals
  cartItem = signal<Cart[]>([]);

  cartCounter = signal<number>(0);

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

    if (this.isLoggedIn === true) {
      this.cartItems$ = this.cartCollection.valueChanges({ idField: 'id' });
    }

  }

  wishListService = inject(WishListService);

  updateCartCounter(userId: string) {
    this.cartByStatus(userId,'open').pipe(takeUntil(this._unsubscribeAll)).subscribe((cart) => {
    console.debug('cart length:', cart.length);
    });
  }

  async cartCount(): Promise<number>  {
    const { collection, getCountFromServer } = require("firebase/firestore");
    const collectionRef = this.afs.collection(`users/${this.userId}/cart/`);
    const snapshot = await getCountFromServer(collectionRef);
    console.log('count: ', snapshot.data().count);
    return snapshot.data().count;
  }

  async queryCartCount(userId: string): Promise<Observable<number>> {
      const { collection, getCountFromServer } = require("firebase/firestore");
      const coll = collection(this.afs.firestore, `users/${this.userId}/cart/`, (ref) => {
        ref.where('status', '==', 'open');
      });
      const q = query(coll, where("status", "==", "open"));
      const snapshot = await getCountFromServer(q);
      console.log('count: ', snapshot.data().count);
      return of(snapshot.data().count);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  getCartCount(userId: string): Observable<number | undefined> {
    this.afs.collection(`users/${userId}/cart`)
      .snapshotChanges()
      .forEach((snaps) => {
         return of(snaps.length);
      }
    );
    return of(0);
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

  getAll(userId: string) {
    var cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(`user/${userId}/cart`);
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
    return  cartItemsCollection.valueChanges({ idField: 'id' }).pipe(map((cart) => cart.filter((status) => status.status === cartStatus))
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

  public create(mtCart: Product) {
    const collectionRef = this.afs.collection(`users/${this.userId}/cart/`);
    collectionRef.add(mtCart).then ( (docRef) => {
      console.debug('Document written with ID: ', docRef.id);
      this.snack.open('Selection has been added to your cart ...', 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
      duration: 3000,
      });
      }).catch((error) => {
         console.error('Error adding document: ', error);
         throwError(() => new Error(error))
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
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];

    if (prod) {
      prod.subscribe((result) => {
        const cart: Product = {
          ...result,
          id: productId,
          is_completed: false,
          user_purchased: userId,
          date_sold: updateDate,
          date_updated: updateDate,
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
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    if (prod) {
      prod.subscribe((result) => {
        // get the wish item
        const wish: Product = {
          ...result,
          product_id: productId,
          is_completed: false,
          user_purchased: userId,
          date_sold: updateDate,
          date_updated: updateDate,
          quantity: quantity,
          status: 'open',
        };
        // create the cart item from the list item
        this.create(wish);
        // delete the wish item from the wish list
        this.wishListService.deleteWishListItemById(productId);
        this.cartCounter.set(this.cartCounter() + 1);
      });
    }
  }

  update(mtCart: Cart) {
    this.cartCollection.doc(mtCart.id.toString()).update(mtCart);
    this.snack.open('Cart has been updated ... ', 'OK', {
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
    this.snack.open('Item has been removed ... ', 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
      duration: 2000
    });
  }
}
