import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { ShoppingCart } from 'app/models/shopping_cart';
import { convertSnaps } from './db-utils';
import { IImageStorage } from 'app/models/maintenance';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartCollection: AngularFirestoreCollection<ShoppingCart>;
  private cartItems: Observable<ShoppingCart[]>;

  constructor(public afs: AngularFirestore) {
    this.cartCollection = afs.collection<ShoppingCart>('shopping_cart')
    this.cartItems = this.cartCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Inventory ${this.cartItems}`);
    return this.cartItems;
  }

  get(id: string) {
    return this.cartCollection.doc(id).get();
  }

  getCartImage(parentId: string): any {
    var cartImages: Observable<IImageStorage[]>;
    var cartImagesCollection: AngularFirestoreCollection<IImageStorage>;
    cartImagesCollection = this.afs.collection<IImageStorage>(`shopping_cart/${parentId}/images`);
    cartImages = cartImagesCollection.valueChanges({ idField: 'id' });
    return cartImages;
  }


  findCartByUrl(id: string): Observable<ShoppingCart | undefined > {
      return this.afs.collection('shopping_cart',
          ref => ref.where("id", "==", id))
          .snapshotChanges()
          .pipe(
              map(snaps => {
                  const shoppingItem = convertSnaps<ShoppingCart>(snaps);
                  return shoppingItem.length == 1 ? shoppingItem[0]  : undefined
              }),
            first()
          );
  }

  create(shoppingCart: ShoppingCart) {
    this.cartCollection.add(shoppingCart);
  }

  update(shoppingCart: ShoppingCart) {
    this.cartCollection.doc(shoppingCart.id.toString()).update(shoppingCart);
  }

  delete(id: string) {
    this.cartCollection.doc(id).delete();
  }

}
