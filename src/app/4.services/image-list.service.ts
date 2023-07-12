import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { imageItem } from 'app/5.models/imageItem';
import { rawImageItem } from 'app/5.models/rawImagesList';
import { convertSnaps } from './db-utils';
import { Observable, BehaviorSubject, map, first, of, Subscription } from 'rxjs';
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

  private imageItemCollections: AngularFirestoreCollection<imageItem>;
  private updateItemsCollection: AngularFirestoreCollection<imageItem>;
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
    this.updateItemsCollection = afs.collection<imageItem>('imagelist');
    this.loadImageItems = this.updateItemsCollection.valueChanges({
      idField: 'id',
    });

    this.imageItemCollections = afs.collection<imageItem>('imagelist', (ref) =>
      ref.orderBy('ranking')
    );
    this.imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });
  }

  getImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'imagelist');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<imageItem[]
    >;
  }

  getAllRawImages() {
    return this.rawImageItems;
  }

  getImages() {
    return this.imageItems;
  }

  getImagesBySize(size: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((image) => image.imageAlt.includes(size)).filter((type) => type.type === 'IN_NOT_USED')));
      //map((images) => images.filter((type) => type.imageAlt.includes(size))));
  }

  getImagesByType(imageType: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((type) => type.type === imageType))
    );
  }

  getImagesByTypeAndProductId(imageType: string, productId: string) {
    return this.imageItems.pipe(
      map((images) =>
        images
          .filter((type) => type.type === imageType)
          .filter((prod) => prod.parentId === productId)
      )
    );
  }

  getImagesByProductId(productId: string) {
    return this.imageItems.pipe(
      map((images) =>
        images.filter((imageList) => imageList.parentId === productId)
      )
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
        this.imageItemCollections.add(image);
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
    this.imageItemCollections.doc(id).get();
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
    this.imageItemCollections.add(image).then((imgItem) => {
      image.id = imgItem.id;
      this.imageItemCollections.doc(imgItem.id).update(image);
    });
  }

  update(item: imageItem, productId: string) {
    // console.debug(JSON.stringify(item));
    item.parentId = productId;
    this.imageItemCollections.doc(productId).update(item);
    //this.updateInventory(item, productId)
  }

  updateCollectionDescription(id: string, description: string) {
    console.log(`Updating ${id} with ${description}`);
    this.imageItemCollections.doc(id).update({ description: description });
  }

  updateImageList(item: imageItem) {
    this.imageItemCollections.doc(item.id).update(item);
  }

  delete(id: string) {
    this.imageItemCollections.doc(id).delete();
  }

  // creates a list of all images currently names in the imae
  updateRawImageList() {
    this.rawImagesArray = [];
    this.getAll().subscribe((imageList) => {
      this.rawImagesArray = imageList;
    });
  }



  dupes: string[] = [];

  deleteDuplicateImages() {
    let not_usedImages: imageItem[] = [];
    let subNotUsed: Subscription;

    subNotUsed = this.getImagesBySize('400')
      .subscribe((item) => {
        not_usedImages = item;
        this.deleteDupes(not_usedImages);
    });
    console.log(`Deleting ${this.dupes.length}`);
    this.deletefFromFirebase(this.dupes);
  }

  deleteDupes(not_usedImages: imageItem[]) {
    let found = false;

    this.rawImagesArray = [];
    not_usedImages.forEach((items) => {
      found = this.doesItemExist(items, found);
      if (!found) {
        this.rawImagesArray.push(items);
      }
      else {
        this.dupes.push(items.id);
      }
      found = false;
    });
  }

  doesItemExist(image: imageItem, found: boolean): boolean {
    found = false;
    this.rawImagesArray.forEach((img) => {
        if (img.imageAlt === image.imageAlt) {
          found = true;
        }
     });
    return found
  }

  deletefFromFirebase(dupes: string[]) {

    dupes.forEach((dupe) => {
        this.delete(dupe);
    });
  }


  async createRawImagesList() {
    await this.createRawImagesList_200();
    await this.createRawImagesList_400();
    await this.createRawImagesList_800();
  }

  async createRawImagesList_200() {
    this.rawImagesArray = [];
    this.getImagesBySize('200').subscribe((imageList) => {
      this.rawImagesArray = imageList;
      let ranking = 0;
      this.storage.ref('/thumbnails').listAll()
        .subscribe((files) => {
          files.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((downloadURL) => {
              ranking++;
              const imageUrl = downloadURL;
              const imageData: imageItem = {
                parentId: '',
                caption: imageRef.fullPath,
                type: 'IN_NOT_USED',
                imageSrc: imageUrl,
                imageAlt: imageRef.name,
                ranking: ranking,
                id: '',
              };
              let found = false;
              this.rawImagesArray.forEach((img) => {
                if (img.imageAlt === imageData.imageAlt) {
                  found = true;
                }
              });
              if (!found) {
                this.createItem(imageData);
              }
            });
          });
        });
    });
  }

  async createRawImagesList_400() {
    this.updateRawImageList();
    let ranking = 0;
    this.storage
      .ref('/400')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            ranking++;
            const imageUrl = downloadURL;
            const imageData: imageItem = {
              parentId: '',
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            let found = false;
            this.rawImagesArray.forEach((img) => {
              if (img.imageAlt === imageData.imageAlt) {
                found = true;
              }
            });
            if (!found) {
              this.createItem(imageData);
            }
          });
        });
      });
  }

  async createRawImagesList_800() {
    this.updateRawImageList();
    let ranking = 0;
    this.storage
      .ref('/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            ranking++;
            const imageUrl = downloadURL;
            const imageData: imageItem = {
              parentId: '',
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            let found = false;
            this.rawImagesArray.forEach((img) => {
              if (img.imageAlt === imageData.imageAlt) {
                found = true;
              }
            });
            if (!found) {
              this.createItem(imageData);
            }
          });
        });
      });
  }
}
