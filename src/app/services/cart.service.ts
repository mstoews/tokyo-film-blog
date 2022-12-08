import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { first, map, Observable } from 'rxjs'
import { Product } from 'app/models/products'
import { convertSnaps } from './db-utils'
import { IImageStorage } from 'app/models/maintenance'
import { AngularFireAuth } from '@angular/fire/compat/auth/auth'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private cartCollection: AngularFirestoreCollection<Product>
  private cartItems: Observable<Product[]>
  isLoggedIn: boolean
  userId: string

  constructor(public afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.authState
      .pipe(map((user) => !!user))
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn))

    this.cartCollection = afs.collection<Product>('inventory')
    this.cartItems = this.cartCollection.valueChanges({ idField: 'id' })
  }

  getAll() {
    // console.log(`Inventory ${this.cartItems}`);
    return this.cartItems
  }

  get(id: string) {
    return this.cartCollection.doc(id).get()
  }

  getProductImage(userId: string, parentId: string): any {
    var cartImages: Observable<IImageStorage[]>
    var cartImagesCollection: AngularFirestoreCollection<IImageStorage>
    cartImagesCollection = this.afs.collection<IImageStorage>(
      `user/${userId}/cart/${parentId}/images`
    )
    cartImages = cartImagesCollection.valueChanges({ idField: 'id' })
    return cartImages
  }

  findProductByUrl(id: string): Observable<Product | undefined> {
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

  create(mtProduct: Product) {
    this.cartCollection.add(mtProduct)
  }

  update(mtProduct: Product) {
    this.cartCollection.doc(mtProduct.id.toString()).update(mtProduct)
  }

  delete(id: string) {
    this.cartCollection.doc(id).delete()
  }
}
