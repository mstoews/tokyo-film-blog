import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product as Product } from 'app/models/products';

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
    var inventory = this.afs.collection('/inventory', ref => ref.where('category', '==', 'Sweater'));
  }

  getAll() {
    console.log(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
     this.ProductsCollection.doc(id).get();
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
