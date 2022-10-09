import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IProduct } from 'app/interfaces/mt-Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mtProductsCollection: AngularFirestoreCollection<IProduct>;
  private inventoryItems: Observable<IProduct[]>;

  constructor(public afs: AngularFirestore) {
    this.mtProductsCollection = afs.collection<IProduct>('inventory')
    this.inventoryItems = this.mtProductsCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
     this.mtProductsCollection.doc(id).get();
  }

  create(mtProduct: IProduct) {
    this.mtProductsCollection.add(mtProduct);
  }

  update(mtProduct: IProduct) {
    this.mtProductsCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    this.mtProductsCollection.doc(id).delete();
  }
}
