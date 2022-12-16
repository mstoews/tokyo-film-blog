import { Injectable } from '@angular/core'
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { first, map, Observable } from 'rxjs'
import { Cart } from 'app/models/cart'
import { Product } from 'app/models/products';
import { convertSnaps } from './db-utils'
import { IImageStorage } from 'app/models/maintenance'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCollection: AngularFirestoreCollection<Cart>
  private cartItems: Observable<Cart[]>
  isLoggedIn: boolean
  userId: string

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    private snack: MatSnackBar) {

    auth.authState.subscribe((user) => {
        this.userId = user?.uid;
    })

    this.auth.authState
        .pipe(map((user) => !!user))
        .subscribe((isLoggedIn) => {
          this.isLoggedIn = isLoggedIn
        });

    if (this.isLoggedIn) {
       this.cartItems = this.cartCollection.valueChanges({ idField: 'id', })
    }
  }

  getAll() {
    var cartItems: Observable<Cart[]>
    var cartItemsCollection: AngularFirestoreCollection<Cart>
    cartItemsCollection = this.afs.collection<Cart>(`user/${this.userId}/cart`)
    cartItems = cartItemsCollection.valueChanges({ idField: 'id' })
    return cartItems
  }

  get(id: string) {
    return this.cartCollection.doc(id).get()
  }

  cartByUserId(userId: string): any{
    var cartItems: Observable<Cart[]>
    var cartItemsCollection: AngularFirestoreCollection<Cart>
    cartItemsCollection = this.afs.collection<Cart>(
      `users/${userId}/cart`
    )
    cartItems = cartItemsCollection.valueChanges({ idField: 'id' })
    return cartItems
  }

  getCartImage(userId: string, parentId: string): any {
    var cartImages: Observable<IImageStorage[]>
    var cartImagesCollection: AngularFirestoreCollection<IImageStorage>
    cartImagesCollection = this.afs.collection<IImageStorage>(
      `user/${userId}/cart/${parentId}/images`
    )
    cartImages = cartImagesCollection.valueChanges({ idField: 'id' })
    return cartImages
  }

  findCartByUrl(id: string): Observable<Cart | undefined> {
    return this.afs
      .collection('cart', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const Cart = convertSnaps<Cart>(snaps)
          return Cart.length == 1 ? Cart[0] : undefined
        }),
        first()
      )
  }


  create(mtCart: Cart) {
    console.log('product id:', mtCart.id);
    const collectionRef = this.afs.collection(`users/${this.userId}/cart/`);
    collectionRef.add(mtCart);
    this.snack.open('Selection has been added to your cart ...', 'Ok');
  }

  findProductById(id: string): Observable<Product | undefined> {
    return this.afs
      .collection('inventory', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const product = convertSnaps<Product>(snaps)
          return product.length == 1 ? product[0] : undefined
        }),
        first()
      )
  }

  addToCart(productId: string){
    let userId = this.userId;
    let prod = this.findProductById(productId);
    if(prod){
      prod.subscribe(result => {
          const cart: Cart = {
            ...result,
            product_id:  productId,
            is_completed: false,
            user_purchased: userId,
            date_sold: Timestamp.now(),
            date_updated: Timestamp.now()
          }
          this.create(cart);
      });
    }
  }


  update(mtCart: Cart) {
    this.cartCollection.doc(mtCart.id.toString()).update(mtCart)
    this.snack.open('Item ahs been updated ... ');
  }

  async delete(id: string) {
    var cartItems: Observable<Cart[]>;
    var cartItemsCollection: AngularFirestoreCollection<Cart>;
    cartItemsCollection = this.afs.collection<Cart>(`users/${this.userId}/cart`);
    cartItems = cartItemsCollection.valueChanges({ idField: 'id' });
    cartItemsCollection.doc(id).delete();
    this.snack.open('Item ahs been removed ... ', 'Deleted');

  }
}
