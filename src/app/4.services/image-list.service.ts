import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ImageItemSnap, imageItem } from 'app/5.models/imageItem';
import { rawImageItem } from 'app/5.models/rawImagesList';
import { convertSnaps } from './db-utils';
import {
  Observable,
  BehaviorSubject,
  map,
  first,
  of,
  Subscription,
} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  setDoc,
  OrderByDirection,
  CollectionReference,
} from '@angular/fire/firestore';
import { TitleStrategy } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ImageListService {
  private imageItemCollections: AngularFirestoreCollection<imageItem>;

  private originalImageCol: AngularFirestoreCollection<imageItem>;
  private mediumImageCol: AngularFirestoreCollection<imageItem>;
  private smallImageCol: AngularFirestoreCollection<imageItem>;
  private largeImageCol: AngularFirestoreCollection<imageItem>;


  private updateItemsCollection: AngularFirestoreCollection<imageItem>;
  private rawImageItems: Observable<rawImageItem[]>;
  private loadImageItems: Observable<imageItem[]>;
  private imageItems: Observable<imageItem[]>;

  private largeImageItems: Observable<imageItem[]>;
  private smallImageItems: Observable<imageItem[]>;
  private mediumImageItems: Observable<imageItem[]>;
  private originalImageItems: Observable<imageItem[]>;

  items$: Observable<imageItem[]>;
  typeFilter$: BehaviorSubject<string | null>;
  rawImagesArray: imageItem[] = [];

  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.originalImageCol = afs.collection<imageItem>('originalImageList');
    this.smallImageCol = afs.collection<imageItem>('smallImageList');
    this.mediumImageCol = afs.collection<imageItem>('mediumImageList');
    this.largeImageCol = afs.collection<imageItem>('largeImageList');

    this.updateItemsCollection = afs.collection<imageItem>('imagelist');
    this.loadImageItems = this.updateItemsCollection.valueChanges({
      idField: 'id',
    });

    this.imageItemCollections = afs.collection<imageItem>('imagelist', (ref) =>
      ref.orderBy('ranking')
    );
    this.imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });
    this.mediumImageItems = this.mediumImageCol.valueChanges({ idField: 'id' });
  }

  matSnackBar = inject(MatSnackBar);


  async createImageSrc(ref: string, size: string) {
    let ranking = 0;
    this.storage
      .ref(ref)
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
              largeImageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking,
              id: '',
            };
            console.log(`Creating ${imageData.imageAlt}`);
            switch (size) {
              case 'small':
                this.smallImageCol.doc(imageData.imageAlt).set(imageData);
                break;
              case 'medium':
                this.mediumImageCol.doc(imageData.imageAlt).set(imageData);
                break;
              case 'large':
                this.largeImageCol.doc(imageData.imageAlt).set(imageData);
                break;
              case 'original':
                this.originalImageCol.doc(imageData.imageAlt).set(imageData);
                break;
              default:
                this.originalImageCol.doc(imageData.imageAlt).set(imageData);
            }
          });
        });
      });
  }


  getLargeImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'largeImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<  imageItem[]  >;
  }

  LargeImageRef<T = imageItem | ImageItemSnap>(imageName: string) {
    const imageCol = collection( this.afs.firestore,'largImageList') as CollectionReference<T>;
    return doc<T>(imageCol, imageName);
0  }


  LargeImageCol<T = ImageItemSnap | imageItem>(imageName: string) {
    const ref = this.LargeImageRef<ImageItemSnap>(imageName);
    return collection(ref, 'largeimagelist') as CollectionReference<T>;
  }

  largeImages$(imageName: string) {
    const ref = this.LargeImageCol<ImageItemSnap>(imageName);
    return collectionData(ref, { idField: 'id' });
  }

  async updateLargeImageItem(image: Partial<imageItem>) {
    const imageRef = this.LargeImageRef(image.imageAlt);
    return setDoc(imageRef, image, { merge: true });
  }

  async deleteLargeImageItem(image: Partial<imageItem>) {
    const imageRef = this.LargeImageRef(image.imageAlt);
    return deleteDoc(imageRef);
  }

  getAllRawImages() {
    return this.rawImageItems;
  }

  getImages() {
    return this.imageItems;
  }


  getImageBySizeAndName(size: string, imageName: string) {
    let image = this.mediumImageItems.pipe( map((images) => image.filter((type: imageItem) => type.imageAlt.includes(imageName))));
    return image;
  }

  getImagesBySize(size: string) {
    return this.imageItems.pipe(
      map((images) =>
        images
          .filter((image) => image.imageAlt.includes(size))
          .filter((type) => type.type === 'IN_NOT_USED')
      )
    );
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
            largeImageSrc: img.imageSrc,
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
    this.matSnackBar.open(`Description with ${description}`, 'OK', {
      duration: 2000,
    });
  }

  updateImageList(item: imageItem) {
    this.imageItemCollections.doc(item.id).update(item);
    // 161714D0-73C9-4C75-8D15-B8B2F08EE5E1_200x200.JPG
    // find and update the additional inventory image
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

  async createRawImagesList() {
    await this.createRawImagesList_200();
    await this.createRawImagesList_400();
    await this.createRawImagesList_800();
  }

  getImagesSize(size: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((image) => image.imageAlt.includes(size)))
    );
    //map((images) => images.filter((type) => type.imageAlt.includes(size))));
  }

  async updateImageListLargeImageSrc() {
    const largeImages = this.getImagesSize('400');
    this.getImagesSize('200').subscribe((imageList) => {
      imageList.forEach((item) => {
        largeImages.subscribe((largeImageList) => {
          largeImageList.forEach((largeImage) => {
            if (
              item.imageAlt.substring(0, 15) ===
              largeImage.imageAlt.substring(0, 15)
            ) {
              item.largeImageSrc = largeImage.imageSrc;
              console.log(
                `Updating ${item.imageAlt} with ${largeImage.imageSrc}`
              );
              this.updateImageList(item);
            }
          });
        });
      });
    });
  }

  createOriginalItem(image: imageItem) {
    this.imageItemOriginal.add(image).then((imgItem) => {
      this.imageItemOriginal.doc(image.imageAlt).update(image);
    });
  }

  private imageItemOriginal: AngularFirestoreCollection<imageItem>;
  private imageItem200: AngularFirestoreCollection<imageItem>;
  private imageItem400: AngularFirestoreCollection<imageItem>;
  private imageItem800: AngularFirestoreCollection<imageItem>;


  async createRawImagesList_200(): Promise<void> {
    this.rawImagesArray = [];
    this.getImagesBySize('200').subscribe((imageList) => {
      this.rawImagesArray = imageList;
      let ranking = 0;
      this.storage
        .ref('/thumbnails')
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
                largeImageSrc: imageUrl,
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
              largeImageSrc: imageUrl,
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
              largeImageSrc: imageUrl,
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
