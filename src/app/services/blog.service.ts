import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import  { Blog } from 'app/models/blog';
import { FieldValue } from 'firebase/firestore';
import { convertSnaps } from './db-utils';

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

  findBlogByUrl(id: string): Observable<Blog | undefined > {
    return this.afs.collection('blog',
        ref => ref.where("id", "==", id))
        .snapshotChanges()
        .pipe(
            map(snaps => {
                const blog = convertSnaps<Blog>(snaps);
                return blog.length == 1 ? blog[0]  : undefined
            }),
          first()
        );
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
