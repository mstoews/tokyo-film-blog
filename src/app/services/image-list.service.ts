import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { imageItem } from 'app/models/imageItem';
import { Observable, BehaviorSubject, map } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ImageListService {
  private ImageItemsCollection: AngularFirestoreCollection<imageItem>;
  private imageItems: Observable<imageItem[]>;
  private notUsedItems: Observable<imageItem[]>;
  items$: Observable<imageItem[]>;
  typeFilter$: BehaviorSubject<string | null>;

  constructor(public afs: AngularFirestore) {
    this.ImageItemsCollection = afs.collection<imageItem>('imageslist')
    this.imageItems = this.ImageItemsCollection.valueChanges({idField: 'id'});

  }

  getAll() {
    return this.imageItems;
  }

  getNotUsed() {
    return this.imageItems;
  }

  get(id: string) {
     this.ImageItemsCollection.doc(id).get();
  }

  getItemsByType(type: string) {
    return this.afs
    .collection<imageItem>('imageslist',ref =>
    ref.where("type", "==", type))
    .get()
    .pipe(
          map(result => {return result.docs.map(snap => {
            return {
              id: snap.id,
              ...<any>snap.data()
          }
        });
      })
    );
  }

  create(mtImage: imageItem) {
    this.ImageItemsCollection.add(mtImage);
  }

  addList(images: imageItem[]) {
    images.forEach((item) => {
      this.ImageItemsCollection.add(item);
    })
  }

  update(item: imageItem) {
    this.ImageItemsCollection.doc(item.caption).update(item);
  }

  delete(caption: string) {
    this.ImageItemsCollection.doc(caption).delete();
  }
}
