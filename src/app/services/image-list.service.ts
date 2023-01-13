import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { imageItem } from 'app/models/imageItem';
import { rawImageItem } from 'app/models/rawImagesList';
import { convertSnaps } from './db-utils';
import { Observable, BehaviorSubject, map, first, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  setDoc,
  OrderByDirection,
} from '@angular/fire/firestore';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ImageListService {
  private ImageItemsCollection: AngularFirestoreCollection<imageItem>;
  private LoadItemsCollection: AngularFirestoreCollection<imageItem>;
  private RawImagesCollection: AngularFirestoreCollection<rawImageItem>;
  private rawImageItems: Observable<rawImageItem[]>;
  private loadImageItems: Observable<imageItem[]>;
  private imageItems: Observable<imageItem[]>;
  items$: Observable<imageItem[]>;
  typeFilter$: BehaviorSubject<string | null>;
  rawImagesArray: imageItem[] = [];

  constructor(
    public afs: AngularFirestore,

    private storage: AngularFireStorage
  ) {
    this.LoadItemsCollection = afs.collection<imageItem>('imagelist');
    this.loadImageItems = this.LoadItemsCollection.valueChanges({
      idField: 'id',
    });

    this.ImageItemsCollection = afs.collection<imageItem>('imagelist', (ref) => ref.orderBy('ranking') );
    this.imageItems = this.ImageItemsCollection.valueChanges({ idField: 'id' });
  }

  getImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'imagelist');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<imageItem[]>;
  }


  getAllRawImages() {
    return this.rawImageItems;
  }

  getImages() {
    return this.imageItems;
  }

  getImagesByType(imageType: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((type) => type.type === imageType))
    );
  }

  getImagesByTypeAndProductId(imageType: string, productId: string) {
    console.log('Product id for filtering images', productId)
    return this.imageItems.pipe(
      map((images) => images.filter((type) => type.type === imageType).filter((prod) => prod.parentId === productId)
    ));
  }

  getImagesByProductId(productId: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((imageList) => imageList.parentId === productId))
    );
  }

  findImagesByProductId(productId: string): Observable<imageItem | undefined> {
    return this.afs
      .collection('imageList', (ref) => ref.where('parentId', '==', productId))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const caption = convertSnaps<imageItem>(snaps);
          return caption.length == 1 ? caption[0] : undefined;
        }),
        first()
      );
  }



  findRawImageByUrl(caption: string): Observable<imageItem | undefined> {
    return this.afs
      .collection('imageList', (ref) => ref.where('caption', '==', caption))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const caption = convertSnaps<imageItem>(snaps);
          return caption.length == 1 ? caption[0] : undefined;
        }),
        first()
      );
  }

  createRawImage(image: imageItem) {
    this.LoadItemsCollection.add(image);
  }

  async insertImageList(image: imageItem) {
    var isFound: boolean = false;
    const ref = this.afs.collection('imagelist', (ref) =>
      ref.where('parentId', '==', image.parentId)
    );
    ref.get().subscribe((snaps) => {
      snaps.forEach((snap) => {
        isFound = true;
      });
      if (!isFound) {
        this.ImageItemsCollection.add(image);
      }
    });
  }

  createImageList() {
    const rawImage = this.getAllRawImages();
    var count = 0;
    rawImage.subscribe((image) => {
      image.forEach((img) => {
        count++;
        if (img.id != undefined) {
          const item = {
            id: '',
            parentId: img.id as string,
            caption: img.caption,
            imageSrc: img.imageSrc,
            imageAlt: img.imageAlt,
            type: img.type,
            ranking: count,
          };
          this.createItem(item);
        }
      });
    });
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
      .collection<imageItem>('imagelist', (ref) =>
        ref.where('type', '==', type)
      )
      .get()
      .pipe(
        map((result) => {
          return result.docs.map((snap) => {
            return {
              id: snap.id,
              ...(<any>snap.data()),
            };
          });
        })
      );
  }

  createItem(image: imageItem) {
    this.ImageItemsCollection.add(image);
  }

  addList(images: imageItem[]) {
    images.forEach((item) => {
      this.ImageItemsCollection.add(item);
    });
  }

  update(item: imageItem, productId: string) {
    // console.log(JSON.stringify(item));
    item.parentId = productId;
    this.ImageItemsCollection.doc(productId).update(item);
    this.updateInventory(item, productId)
  }

  updateInventory(item: imageItem, productId: string) {
    item.parentId = productId;
    const imageCollectionRef = this.afs.collection(`inventory/${productId}/images`);
    imageCollectionRef.add(item);
  }

  updateImageList(item: imageItem) {
    this.ImageItemsCollection.doc(item.parentId).update(item);
  }

  delete(id: string) {
    this.ImageItemsCollection.doc(id).delete();
  }

  createRawImagesList() {
    var ranking = 0;
    this.storage
      .ref('/inventory/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            ranking++;
            const imageUrl = downloadURL;
            const imageData: any = {
              parentId: '',
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            this.createRawImage(imageData);
          });
        });
      });

    this.storage
      .ref('/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            ranking++;
            const imageUrl = downloadURL;
            const imageData: any = {
              parentId: '',
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            this.createRawImage(imageData);
          });
        });
      });

    this.storage
      .ref('/uploaded/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            ranking++;
            const imageUrl = downloadURL;
            const imageData: any = {
              parentId: '',
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            this.createRawImage(imageData);
          });
        });
      });
  }
}
