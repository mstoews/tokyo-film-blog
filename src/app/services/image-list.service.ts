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
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ImageListService {
  private ImageItemsCollection: AngularFirestoreCollection<imageItem>;
  private RawImagesCollection: AngularFirestoreCollection<rawImageItem>;
  private rawImageItems: Observable<rawImageItem[]>;
  private imageItems: Observable<imageItem[]>;
  items$: Observable<imageItem[]>;
  typeFilter$: BehaviorSubject<string | null>;
  rawImagesArray: imageItem[] = [];

  constructor(public afs: AngularFirestore,

    private storage: AngularFireStorage) {

    this.RawImagesCollection = afs.collection<rawImageItem>('rawimagelist');
    this.rawImageItems = this.RawImagesCollection.valueChanges({ idField: 'id' });

    this.ImageItemsCollection = afs.collection<imageItem>('imageslist', ref => ref.orderBy('ranking'));
    this.imageItems = this.ImageItemsCollection.valueChanges({ idField: 'id' });
  }

  getImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'imageslist');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<imageItem[]>;
  }

  getAllRawImages() {
    return this.rawImageItems;
  }

  getImages() {
    return this.imageItems;
  }

  getImagesByType(imageType: string){
    return this.imageItems.pipe( map(images => images.filter(type => type.type === imageType)));
  }

  findRawImageByUrl(caption: string): Observable<rawImageItem | undefined> {
    return this.afs
      .collection('rawimagelist', (ref) => ref.where('caption', '==', caption))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const caption = convertSnaps<rawImageItem>(snaps);
          return caption.length == 1 ? caption[0] : undefined;
        }),
        first()
      );
  }


  async findImageByUrl(caption: string): Promise<boolean> {
    var isFound: boolean = false;
    this.afs
      .collection('imageslist', (ref) => ref.where('caption', '==', caption))
      .get()
      .subscribe(snaps => {
        snaps.forEach(snap => {
            isFound = true;
          });
        });
      return isFound;
  }

  createRawImage(image: rawImageItem) {
    this.findRawImageByUrl(image.caption).subscribe((img) => {
      if (img?.caption == undefined) {
        this.RawImagesCollection.add(image);
      }
    });
  }

  async insertImageList(image: imageItem) {

    console.log('insertImageList :' ,JSON.stringify(image));
    var isFound: boolean = false;
    const ref = this.afs.collection('imageslist', ref => ref.where('parentId','==', image.parentId));
    ref.get().subscribe(snaps => {
      snaps.forEach(snap => {
        console.log('Found', snap.id);
        isFound = true;
      });
      if (!isFound) {
        console.log('insert : ', image.parentId);
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
            parentId: img.id as string,
            caption: img.caption,
            imageSrc: img.imageSrc,
            imageAlt: img.imageAlt,
            type: img.type,
            ranking: count,
          };
          this.insertImageList(item);
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
      .collection<imageItem>('imageslist', (ref) =>
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

  create(image: imageItem) {
    this.ImageItemsCollection.add(image);
  }

  addList(images: imageItem[]) {
    images.forEach((item) => {
      this.ImageItemsCollection.add(item);
    });
  }

  update(item: any, id: string) {
    console.log(JSON.stringify(item));
    this.ImageItemsCollection.doc(id).update(item);
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
      .ref('/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          ranking++;
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: any = {
              caption: imageRef.fullPath,
              type: 'IN_NOT_USED',
              imageSrc: imageUrl,
              imageAlt: imageRef.name,
              ranking: ranking
            };
            this.createRawImage(imageData)
          });
        });
      });
  }
}
