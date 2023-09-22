import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { Category } from 'app/5.models/category';

import { Product } from 'app/5.models/products';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Category>;
  private categoryItems: Observable<Category[]>;
  private sub: Subscription;

  constructor(public afs: AngularFirestore,
    private productsService: ProductsService) {
    this.categoryCollection = afs.collection<Category>('category');
    this.categoryItems = this.categoryCollection.valueChanges({
      idField: 'id',
    });

    // this.updateIsUsedCategoryList();

  }

  auth = inject(AngularFirestore);

  hashUsedCategoryMap = new Map<string, string>();

  // use this function ot limit the category list to only those that have products.
  getAll() {
    return this.categoryItems;
  }

  updateIsUsedCategoryList() {
    this.sub = this.productsService.getAvailableInventory().subscribe((inventory) => {
      inventory.forEach((item) => {
        if (item.category !== undefined) {
          this.hashUsedCategoryMap.set(item.category, item.category);
        }
      } );

      this.hashUsedCategoryMap.set('All Categories', 'All Categories');

      this.hashUsedCategoryMap.forEach((value, key) => {
         this.categoryCollection.doc(key).update({ isUsed: true });
      });

      this.categoryCollection.get().subscribe((category) => {
        category.docs.forEach((doc) => {
          const categoryItem = doc.data() as Category;
          if (this.hashUsedCategoryMap.has(categoryItem.name)) {
            categoryItem.isUsed = true;
            this.categoryCollection.doc(categoryItem.id).update(categoryItem);
          } else {
            categoryItem.isUsed = false;
            this.categoryCollection.doc(categoryItem.id).update(categoryItem);
          }
        });
      });
    });
  }

  getCategoryList() {
    return this.getAll().pipe(
      map((category) =>
        category.filter((available => available.isUsed === true) )));
  }

  create(category: Category) {
    this.categoryCollection.add(category);
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
