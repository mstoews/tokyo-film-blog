import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Orders as Orders } from 'app/5.models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private OrdersCollection: AngularFirestoreCollection<Orders>;
  private inventoryItems: Observable<Orders[]>;
  private inventory: Observable<Orders>;

  constructor(public afs: AngularFirestore) {
    this.OrdersCollection = afs.collection<Orders>('inventory');
    this.inventoryItems = this.OrdersCollection.valueChanges({ idField: 'id' });
    var inventory = this.afs.collection('/inventory', (ref) =>
      ref.where('category', '==', 'Sweater')
    );
  }

  getAll() {
    // console.debug(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
    this.OrdersCollection.doc(id).get();
  }

  create(Orders: Orders) {
    this.OrdersCollection.add(Orders);
  }

  update(Orders: Orders) {
    this.OrdersCollection.doc(Orders.id.toString()).update(Orders);
  }

  delete(id: string) {
    this.OrdersCollection.doc(id).delete();
  }
}
