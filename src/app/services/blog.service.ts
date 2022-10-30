import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import  { Blog } from 'app/models/blog/mt-Blog';
import { FieldValue } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogCollection: AngularFirestoreCollection<Blog>;
  private blogItems: Observable<Blog[]>;

  constructor(public afs: AngularFirestore) {
    this.blogCollection = afs.collection<Blog>('blog')
    this.blogItems = this.blogCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    return this.blogItems;
  }

  create(blog: Blog) {
    // console.log(JSON.stringify(blog));
    this.blogCollection.add(blog);
  }

  update(blog: Blog) {
    // console.log(JSON.stringify(blog));
    this.blogCollection.doc(blog.id.toString()).update(blog);
  }

  delete(id: string) {
    this.blogCollection.doc(id).delete();
  }
}
