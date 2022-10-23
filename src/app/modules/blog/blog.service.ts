import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IBlog } from '../../models/blog/mt-Blog';

  @Injectable({
    providedIn: 'root'
  })

  export class BlogService {
    private blogItems: Observable<IBlog[]>;
    private mtBlogCollection: AngularFirestoreCollection<IBlog>;

    constructor(public afs: AngularFirestore) {
    this.mtBlogCollection = afs.collection<IBlog>('blog');
    this.blogItems = this.mtBlogCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`blogs ${JSON.stringify(this.blogItems)}`);
    return this.blogItems;
  }

  getById(id: string) {
    this.mtBlogCollection.doc(id).get();
  }

}
