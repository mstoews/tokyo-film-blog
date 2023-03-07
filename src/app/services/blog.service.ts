import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, Observable, tap } from 'rxjs';
import { Blog, BlogPartial } from 'app/models/blog';
import { convertSnaps } from './db-utils';
import { IImageStorage } from 'app/models/maintenance';
import { ImageListService } from './image-list.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogCollection: AngularFirestoreCollection<Blog>;
  private blogPartialCollection: AngularFirestoreCollection<BlogPartial>;
  private blogPartialItems: Observable<BlogPartial[]>
  private blogItems: Observable<Blog[]>;

  constructor(
    private afs: AngularFirestore,
    private imageListService: ImageListService
    ) {

    this.blogCollection = afs.collection<Blog>('blog');
    this.blogItems = this.blogCollection.valueChanges({ idField: 'id' });
    this.blogPartialCollection = afs.collection<BlogPartial>('blog');
    this.blogPartialItems = this.blogPartialCollection.valueChanges({ idField: 'id'});
  }


  setToPublish(blog: Blog) {
    blog.published = true;
    this.blogCollection.doc(blog.id).update(blog);
  }

  getBlogImage(parentId: string): any {
    return this.imageListService.getImagesByProductId(parentId);
    // var blogImages: Observable<IImageStorage[]>;
    // var blogImagesCollection: AngularFirestoreCollection<IImageStorage>;
    // blogImagesCollection = this.afs.collection<IImageStorage>(`blog/${parentId}/images`);
    // blogImages = blogImagesCollection.valueChanges({ idField: 'id' });
    // return blogImages;
  }

  //getAllPublishedBlog(): Observable<Blog[]> {
    getAllPublishedBlog() {
    return this.blogItems;
    // const blog$ = this.blogItems;
    // const publishedBlogs =  blog$.pipe(map((blogs) => {
    //   tap(() => console.debug('published blogs')),
    //   blogs.filter( blog => blog.published === true);
    // }));
    // return publishedBlogs;
  }

  getAll() : any {
    return this.blogItems;
  }


  getBlog(id: string) {
    const ref = this.afs
      .collection<Blog>('blog', (ref) => ref.where('id', '==', id).limit(1))
      .snapshotChanges()
      .pipe(
        map((blog) =>
          blog.map((a) => {
            // console.debug(a.payload.doc.id);
          })
        )
      );
  }

  findBlogByUrl(id: string): Observable<Blog | undefined> {
    return this.afs
      .collection('blog', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const blog = convertSnaps<Blog>(snaps);
          return blog.length == 1 ? blog[0] : undefined;
        }),
        first()
      );
  }

  retrieveBlogs() {
    return this.blogItems;
  }

  createBlog(blog: Blog) {
    blog.published = false;
    return this.blogCollection.add(blog);
  }

  update(blog: Blog) {
    this.blogCollection.doc(blog.id).update(blog);
  }

  updatePartial(blog: BlogPartial) {
    return this.blogCollection.doc(blog.id).update(blog);
  }

  createPartial(blog: BlogPartial) {
    return this.blogPartialCollection.add(blog);
  }

  delete(id: string) {
    this.blogCollection.doc(id).delete();
  }
}
