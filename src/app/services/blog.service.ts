import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { first, map, Observable } from 'rxjs'
import { Blog } from 'app/models/blog'
import { convertSnaps } from './db-utils'
import { IImageStorage } from 'app/models/maintenance'

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogCollection: AngularFirestoreCollection<Blog>
  private blogItems: Observable<Blog[]>

  constructor(public afs: AngularFirestore) {
    this.blogCollection = afs.collection<Blog>('blog')
    this.blogItems = this.blogCollection.valueChanges({ idField: 'id' })
  }

  getBlogImage(parentId: string): any {
    var blogImages: Observable<IImageStorage[]>
    var blogImagesCollection: AngularFirestoreCollection<IImageStorage>
    blogImagesCollection = this.afs.collection<IImageStorage>(
      `blog/${parentId}/images`
    )
    blogImages = blogImagesCollection.valueChanges({ idField: 'id' })
    return blogImages
  }

  getAll() {
    return this.blogItems
  }

  getBlog(id: string) {
    const ref = this.afs
      .collection<Blog>('blog', (ref) => ref.where('id', '==', id).limit(1))
      .snapshotChanges()
      .pipe(
        map((blog) =>
          blog.map((a) => {
            // console.log(a.payload.doc.id);
          })
        )
      )
  }

  findBlogByUrl(id: string): Observable<Blog | undefined> {
    return this.afs
      .collection('blog', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const blog = convertSnaps<Blog>(snaps)
          return blog.length == 1 ? blog[0] : undefined
        }),
        first()
      )
  }

  retrieveBlogs() {
    return this.blogItems
  }

  create(blog: Blog) {
    this.blogCollection.add(blog)
  }

  update(blog: Blog) {
    this.blogCollection.doc(blog.id.toString()).update(blog)
  }

  delete(id: string) {
    this.blogCollection.doc(id).delete()
  }
}
