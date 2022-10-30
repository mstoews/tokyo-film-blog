import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'app/models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mtProductsCollection: AngularFirestoreCollection<Product>;
  private inventoryItems: Observable<Product[]>;

  constructor(public afs: AngularFirestore) {
    this.mtProductsCollection = afs.collection<Product>('inventory')
    this.inventoryItems = this.mtProductsCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
     this.mtProductsCollection.doc(id).get();
  }

  create(mtProduct: Product) {
    this.mtProductsCollection.add(mtProduct);
  }

  update(mtProduct: Product) {
    this.mtProductsCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    this.mtProductsCollection.doc(id).delete();
  }
}
