import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { Product } from 'app/models/products';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private ProductsCollection: AngularFirestoreCollection<Product>;
  private inventoryItems: Observable<Product[]>;
  private inventory: Observable<Product>

  constructor(public afs: AngularFirestore) {
    this.ProductsCollection = afs.collection<Product>('inventory')
    this.inventoryItems = this.ProductsCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
    return this.ProductsCollection.doc(id).get();
  }

  findProductByUrl(id: string): Observable<Product | undefined > {
      return this.afs.collection('inventory',
          ref=> ref.where("id", "==", id))
          .snapshotChanges()
          .pipe(
              map(snaps => {
                  const product = convertSnaps<Product>(snaps);
                  return product.length == 1 ? product[0] : undefined
              }),
            first()
          )
  }

  create(mtProduct: Product) {
    this.ProductsCollection.add(mtProduct);
  }

  update(mtProduct: Product) {
    this.ProductsCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    this.ProductsCollection.doc(id).delete();
  }

}
