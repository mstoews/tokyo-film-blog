import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, Observable, tap } from 'rxjs';
import { Blog, BlogPartial, Comments } from 'app/5.models/blog';
import { convertSnaps } from './db-utils';
import { ImageListService } from './image-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageItemIndexService } from './image-item-index.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogCollection: AngularFirestoreCollection<Blog>;
  private blogPartialCollection: AngularFirestoreCollection<BlogPartial>;
  private blogItems: Observable<Blog[]>;
  private commentItems: Observable<Comments[]>;
  private commentCollection: AngularFirestoreCollection<Comments>;

  constructor(private afs: AngularFirestore, private snack: MatSnackBar) {
    this.blogCollection = afs.collection('blog', (ref) =>
      ref.orderBy('date_created', 'desc')
    );
    this.blogItems = this.blogCollection.valueChanges({ idField: 'id' });
    this.blogPartialCollection = afs.collection<BlogPartial>('blog');
  }

  imageItemIndexService = inject(ImageItemIndexService);

  createComment(comment: Comments) {
    const collectionRef = this.afs.collection(
      `/blog/${comment.blog_id}/comment`
    );

    collectionRef
      .add(comment)
      .then((newComment) => {
        comment.id = newComment.id;
        this.updateComment(comment);
        this.snack.open('Comment added to the thoughts ... ', 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        });
      })
      .catch((error) => {
        alert('Unable to update comment');
      })
      .finally();
  }

  addCommentReply(blog_id: string, commentId: string, reply: string) {
    const collectionRef = this.afs.collection(
      `blog/${blog_id}/comment/`,
      (ref) => ref.orderBy('date_created', 'desc')
    );
    const dDate = new Date();
    const updateDate = dDate.toISOString();
    const comment = { reply: reply, reply_date: updateDate };
    collectionRef.doc(commentId).update(comment);
  }

  deleteComment(blog_id: string, comment_id: string) {
    const collectionRef = this.afs.collection(
      `blog/${blog_id}/comment/`,
      (ref) => ref.orderBy('created_date', 'desc')
    );
    collectionRef.doc(comment_id).delete();
  }

  updateComment(comment: Comments) {
    const collectionRef = this.afs.collection(
      `blog/${comment.blog_id}/comment/`
    );
    collectionRef.doc(comment.id).update(comment);
  }

  getComments(blog_id: string): any {
    const collectionRef = this.afs.collection(
      `blog/${blog_id}/comment/`,
      (ref) => ref.orderBy('created_date', 'desc')
    );
    const commentItems = collectionRef.valueChanges({ idField: 'id' });
    return commentItems;
  }

  setToPublish(blog: Blog) {
    blog.published = true;
    this.blogCollection.doc(blog.id).update(blog);
  }

  getBlogImage(parentId: string): any {
    return this.imageItemIndexService.getImageByType(parentId);
  }

  getAllPublishedBlog() {
    return this.blogItems.pipe(
      map((blogs) =>
        blogs.filter(
          (pub) =>
            (pub.published === true ))
      )
    );
  }



  getCinemaBlog() {
    return this.blogItems.pipe(
      map((blogs) =>
        blogs.filter(
          (pub) =>
            pub.cinema === true &&
            pub.published === true &&
            pub.calendar !== true
        )
      )
    );
  }

  getCalendarBlog() {
    return this.blogItems.pipe(
      map((blogs) =>
        blogs.filter((pub) => pub.calendar === true && pub.published === true)
      )
    );
  }

  getAll(): any {
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
