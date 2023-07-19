import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collection, collectionData } from '@angular/fire/firestore';
import { imageItem } from 'app/5.models/imageItem';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteDuplicateService {
  // Inject dependencies
  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  // local variables
  rawImagesArray: imageItem[] = [];

  image_OriginalItemCollections =
    this.afs.collection<imageItem>('originalImageList');
  image_OriginalItems = this.image_OriginalItemCollections.valueChanges({
    idField: 'id',
  });

  // 400
  image_400ItemCollections = this.afs.collection<imageItem>(
    'mediumImageList',
    (ref) => ref.orderBy('ranking')
  );
  image_400Items = this.image_400ItemCollections.valueChanges({
    idField: 'id',
  });

  // 800
  image_800ItemCollections = this.afs.collection<imageItem>(
    'largeImageList',
    (ref) => ref.orderBy('ranking')
  );
  image_800Items = this.image_800ItemCollections.valueChanges({
    idField: 'id',
  });

  imageItemCollections = this.afs.collection<imageItem>('imagelist', (ref) =>
    ref.orderBy('ranking')
  );
  imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });

  // updateItemsCollection = this.afs.collection<imageItem>('imagelist');

  hashLargeMap = new Map<string, imageItem>();
  hashOriginalMap = new Map<string, imageItem>();
  hashMediumMap = new Map<string, imageItem>();
  hashSmallMap = new Map<string, imageItem>();

  getOriginalImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'originalImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }

  getLargeImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'largeImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }

  getMediumImagesList(): Observable<imageItem[]> {
    const imagesRef = collection(this.afs.firestore, 'mediumImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }


  async updateImages() {
    await this.createImageMaps();
    await this.updateImageList();
  }


  async createImageMaps() {
    this.getOriginalImagesList().subscribe((items) => {
      items.forEach((item) => {
        item.caption = item.caption.replace(/\.[^/.]+$/, '');
        this.hashOriginalMap.set(item.caption, item);
      });
    });

    this.getLargeImagesList().subscribe((items) => {
      items.forEach((item) => {
        item.caption = item.caption
          .replace('_800x800', '')
          .replace(/\.[^/.]+$/, '')
          .replace('800/', '');
        this.hashLargeMap.set(item.caption, item);
      });
    });

    this.getMediumImagesList().subscribe((items) => {
      items.forEach((item) => {
        item.caption = item.caption
          .replace('_400x400', '')
          .replace(/\.[^/.]+$/, '')
          .replace('400/', '');
        this.hashMediumMap.set(item.caption, item);
      });
    });
  }

  async updateImageList() {
    this.sortNotUsed().subscribe((item) => {
      item.forEach((item) => {
        item.caption = item.caption
          .replace(/\.[^/.]+$/, '')
          .replace('_200x200', '')
          .replace('thumbnails/', '');
        const originalImage = this.hashOriginalMap.get(item.caption);
        if (originalImage) {
          item.largeImageSrc = originalImage.imageSrc;
        }

        const largeImage = this.hashLargeMap.get(item.caption);
        if (largeImage) {
          item.imageSrc800 = originalImage.imageSrc;
        }

        const mediumImage = this.hashMediumMap.get(item.caption);
        if (mediumImage) {
          item.imageSrc400 = originalImage.imageSrc;
        }
        this.imageItemCollections.doc(item.id).update(item);
        console.log(`Updating ${item.caption}`);
      });
    });
  }

  getImagesBySize(size: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((image) => image.imageAlt.includes(size)))
    );
  }

  // create a sorted list of the unused images
  sortNotUsed() {
    return this.getImagesBySize('200').pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.caption < b.caption ? -1 : 1;
        });
        return data;
      })
    );
  }

  deleteDuplicateImages() {
    this.sortNotUsed().subscribe((item) => {
      if (item.length > 0) {
        this.deletefFromFirebase(this.deleteDupes(item));
      }
    });
  }

  deleteDupes(not_usedImages: imageItem[]) {
    console.log(
      `Number un-used images in the imageList: ${not_usedImages.length}`
    );
    let found = false;
    let dupes: string[] = [];
    this.rawImagesArray = [];
    not_usedImages.forEach(async (items) => {
      found = this.doesItemDuplicateExist(items, found);
      if (!found) {
        this.rawImagesArray.push(items);
      } else {
        dupes.push(items.id);
      }
      found = false;
    });
    return dupes;
  }

  doesItemDuplicateExist(image: imageItem, found: boolean): boolean {
    // have to have at least one item in the array
    found = false;
    this.rawImagesArray.forEach((img) => {
      if (img.imageAlt === image.imageAlt) {
        found = true;
      }
    });
    return found;
  }

  deletefFromFirebase(dupes: string[]) {
    console.log(`Deleting duplicates :${dupes.length}`);
    dupes.forEach(async (dupeid) => {
      this.imageItemCollections.doc(dupeid).delete();
    });
  }
}
