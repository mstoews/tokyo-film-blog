import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { Category, CategorySnap } from 'app/5.models/category';
import { CollectionReference, collection, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Category>;
  private categoryItems: Observable<Category[]>;
  private sub: Subscription;

  constructor(public afs: AngularFirestore) {
    this.categoryCollection = afs.collection<Category>('category');
    this.categoryItems = this.categoryCollection.valueChanges({
      idField: 'id',
    });
  }

  auth = inject(AngularFirestore);

  getAll() {
    return this.categoryItems;
  }

  getCategoryByIndex(index: number): string {
    let rc = '';
    const items = this.getAll().subscribe
    (data => {
       console.log('data', index);
       rc = data[index].name ;
    });
    return rc;
  }

  create(category: Partial<Category>) {
    return this.update(category);
  }

  update(category: Partial<Category>) {
    this.categoryCollection.doc(category.id).update(category);
  }

  delete(id: string) {
    this.categoryCollection.doc(id).delete();
  }

  onDestroy() {
    this.sub.unsubscribe();
  }

}
