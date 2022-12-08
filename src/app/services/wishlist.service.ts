import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { first, map, Observable } from 'rxjs'
import { WishList } from 'app/models/wishlist'
import { convertSnaps } from './db-utils'
import { IImageStorage } from 'app/models/maintenance'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private wishListCollection: AngularFirestoreCollection<WishList>
  private wishListItems: Observable<WishList[]>
  isLoggedIn: boolean
  userId: string

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.authState
      .pipe(map((user) => !!user))
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn))

    if (this.isLoggedIn) {
      const user = auth.currentUser
      this.wishListCollection = afs.collection<WishList>(
        `user/${user}/wishlist`
      )
      this.wishListItems = this.wishListCollection.valueChanges({
        idField: 'id',
      })
    }
  }

  getAll() {
    // console.log(`wishList ${this.wishListItems}`);
    return this.wishListItems
  }

  get(id: string) {
    return this.wishListCollection.doc(id).get()
  }

  findWishListByUrl(id: string): Observable<WishList | undefined> {
    return this.afs
      .collection(`users/${this.userId}/wishlist`, (ref) =>
        ref.where('id', '==', id)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const product = convertSnaps<WishList>(snaps)
          return product.length == 1 ? product[0] : undefined
        }),
        first()
      )
  }

  create(mtProduct: WishList) {
    this.wishListCollection.add(mtProduct)
  }

  update(mtProduct: WishList) {
    this.wishListCollection.doc(mtProduct.id.toString()).update(mtProduct)
  }

  delete(id: string) {
    this.wishListCollection.doc(id).delete()
  }
}
