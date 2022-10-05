import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from '@firebase/firestore';

import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProducts} from 'app/interfaces/mt-products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mtProductsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.mtProductsCollection = collection(this.firestore, 'inventory');
  }

  getAll() {
    return collectionData(this.mtProductsCollection) as Observable<IProducts[]>;
  }

  get(id: string) {
    const mtProductsDocumentReference = doc(this.firestore, `inventory/${id}`);
    return docData(mtProductsDocumentReference, { idField: 'ID' });
  }

  create(mtProducts: IProducts) {
    return addDoc(this.mtProductsCollection, mtProducts);
  }

  update(mtProducts: IProducts) {
    const mtProductsDocumentReference = doc(this.firestore,`inventory/${mtProducts.id}` );
    return setDoc(mtProductsDocumentReference, mtProducts );
  }

  delete(id: string) {
    console.log('delete :', id);
    const mtProductsDocumentReference = doc(this.firestore, `inventory/${id}`);
    return deleteDoc(mtProductsDocumentReference);
  }
}
