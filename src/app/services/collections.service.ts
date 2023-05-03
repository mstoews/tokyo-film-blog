import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, Observable, tap } from 'rxjs';
import { Collections, CollectionsPartial } from 'app/models/collection';
import { CollectionsComments } from 'app/models/collection'
import { convertSnaps } from './db-utils';
import { ImageListService } from './image-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {

  private colCollection: AngularFirestoreCollection<Collections>;
  private colPartialCollection: AngularFirestoreCollection<CollectionsPartial>;
  private colItems: Observable<Collections[]>;
  private commentItems: Observable<CollectionsComments[]>;
  private commentCollection : AngularFirestoreCollection<CollectionsComments>;


  constructor(
    private afs: AngularFirestore,
    private snack: MatSnackBar,
    private imageListService: ImageListService
  ) {
    this.colCollection = afs.collection('collection', ref => ref.orderBy('date_created', 'desc'));
    this.colItems = this.colCollection.valueChanges({ idField: 'id' });
    this.colPartialCollection = afs.collection<CollectionsPartial>('collection');
  }

  createComment(comment: CollectionsComments) {

    const collectionRef = this.afs.collection(`/collections/${comment.col_id}/comment`);

    collectionRef.add(comment).then ( newComment => {
      comment.id = newComment.id
      this.updateComment (comment);
      this.snack.open('Comment added to the thoughts ... ', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
      });
    }).catch (error => {
      alert('Unable to update comment');
    }).finally();
  }

  addCommentReply(collection_id: string, commentId: string, reply: string) {
    const collectionRef = this.afs.collection(`collection/${collection_id}/comment/`, ref => ref.orderBy('date_created', 'desc'));
    const dDate = new Date();
    const updateDate = dDate.toISOString();
    const comment = {'reply': reply, reply_date: updateDate};
    collectionRef.doc(commentId).update(comment);
  }

  deleteComment(collection_id: string, comment_id: string) {
    const collectionRef = this.afs.collection(`collection/${collection_id}/comment/`, ref => ref.orderBy('created_date', 'desc'));
    collectionRef.doc(comment_id).delete();
  }


  updateComment(comment: CollectionsComments) {
    const collectionRef = this.afs.collection(`collection/${comment.col_id}/comment/`);
    collectionRef.doc(comment.id).update(comment);
  }

  getComments(collection_id: string): any {
    const collectionRef = this.afs.collection(`collection/${collection_id}/comment/`, ref => ref.orderBy('created_date', 'desc'));
    const commentItems = collectionRef.valueChanges({ idField: 'id' });
    return commentItems;
  }


  setToPublish(collection: Collections) {
    collection.published = true;
    this.colCollection.doc(collection.id).update(collection);
  }

  getCollectionsImage(parentId: string): any {
    return this.imageListService.getImagesByProductId(parentId);
  }

  getAllPublishedBlog() {
    return this.colItems.pipe( map((collections) => collections.filter((pub) => pub.published === true)));
  }

  getAll(): any {
    return this.colItems;
  }

  getCollections(id: string) {
    const ref = this.afs
      .collection<Collections>('collection', (ref) => ref.where('id', '==', id).limit(1))
      .snapshotChanges()
      .pipe(
        map((collection) =>
          collection.map((a) => {
            // console.debug(a.payload.doc.id);
          })
        )
      );
  }

  findBlogByUrl(id: string): Observable<Collections | undefined> {
    return this.afs
      .collection('collection', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const col = convertSnaps<Collections>(snaps);
          return col.length == 1 ? col[0] : undefined;
        }),
        first()
      );
  }

  retrieveCollections() {
    return this.colItems;
  }

  createCollection(col: Collections) {
    col.published = false;
    return this.colCollection.add(col);
  }

  update(col: Collections) {
    this.colCollection.doc(col.id).update(col);
  }

  updatePartial(col: CollectionsPartial) {
    return this.colCollection.doc(col.id).update(col);
  }

  createPartial(col: CollectionsPartial) {
    return this.colPartialCollection.add(col);
  }

  delete(id: string) {
    this.colCollection.doc(id).delete();
  }
}
