import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Category } from 'app/5.models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Category>;
  private categoryItems: Observable<Category[]>;

  constructor(public afs: AngularFirestore) {
    this.categoryCollection = afs.collection<Category>('category');
    this.categoryItems = this.categoryCollection.valueChanges({
      idField: 'id',
    });
  }

  getAll() {
    return this.categoryItems;
  }

  create(category: Category) {
    return this.categoryCollection.add(category);
  }

  update(category: Category) {
    this.categoryCollection.doc(category.id.toString()).update(category);
  }

  delete(name: string) {
    this.categoryCollection.doc(name).delete();
  }
}
