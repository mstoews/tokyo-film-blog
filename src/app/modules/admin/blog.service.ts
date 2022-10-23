import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import  { IBlog } from 'app/models/blog/mt-Blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogCollection: AngularFirestoreCollection<IBlog>;
  private blogItems: Observable<IBlog[]>;

  constructor(public afs: AngularFirestore) {
    this.blogCollection = afs.collection<IBlog>('blog')
    this.blogItems = this.blogCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    return this.blogItems;
  }

  create(blog: IBlog) {
    this.blogCollection.add(blog);
  }

  update(blog: IBlog) {
    console.log(JSON.stringify(blog));
    this.blogCollection.doc(blog.id.toString()).update(blog);
  }

  delete(id: string) {
    this.blogCollection.doc(id).delete();
  }
}
