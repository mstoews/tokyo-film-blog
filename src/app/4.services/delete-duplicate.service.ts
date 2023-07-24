import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collection, collectionData } from '@angular/fire/firestore';
import { imageItem, imageItemIndex, imageItemIndexMap } from 'app/5.models/imageItem';
import { Observable, Subscription, map } from 'rxjs';
import { rawImageItem } from 'app/5.models/rawImagesList';


@Injectable({
  providedIn: 'root',
})
export class DeleteDuplicateService implements OnDestroy{

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // Inject dependencies
  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  // local variables
  imageIndexArray: imageItemIndex[] = [];
  rawIndexArray: imageItem[] = [];

  image_OriginalItemCollections =  this.afs.collection<imageItem>('originalImageList');
  image_OriginalItems = this.image_OriginalItemCollections.valueChanges({ idField: 'id', });
  sub: Subscription


  async createMainImageList(): Promise<void> {
      this.imageIndexArray = [];
       this.sub = (await this.getImageIndexList()).subscribe((item) => {
          this.imageIndexArray = item;
        let ranking = 0;
      this.storage
        .ref('/')
        .listAll()
        .subscribe((files) => {
          files.items.forEach((imageRef) => {
            imageRef.getMetadata().then((meta) => {
              const imageData:  imageItemIndex = {
                id: '',
                fullPath: meta.fullPath,
                size: 'original',
                fileName: meta.name,
                contentType: meta.contentType
              };
              let found = false;
              console.debug(`imageIndexArray Length: ${this.imageIndexArray.length}`)
              this.imageIndexArray.forEach((img) => {
                if (img.fileName === imageData.fileName) {
                  found = true;
                }
              });
              if (!found) {
                this.updateIndexItem(imageData);
                console.debug(`Added ${imageData.fileName}`);
              }
            });
          });
          console.debug('createRawImagesList completed');
        });
      });

  }

updateIndexItem(imageData: imageItemIndex) {
  this.imageIndexCollections.add(imageData).then((imgIndex) => {
    this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
  });
}


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

  imageItemCollections = this.afs.collection<imageItem>('imagelist', (ref) => ref.orderBy('ranking') );
  imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });

  // updateItemsCollection = this.afs.collection<imageItem>('imagelist');

  hashLargeMap = new Map<string, imageItem>();
  hashOriginalMap = new Map<string, imageItem>();
  hashMediumMap = new Map<string, imageItem>();
  hashSmallMap = new Map<string, imageItem>();
  hashAllImagesMap = new Map<string, imageItem>();

  async getOriginalImagesList(): Promise<Observable<imageItem[]>> {
    const imagesRef = collection(this.afs.firestore, 'originalImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }




  async getLargeImagesList(): Promise<Observable<imageItem[]>> {
    const imagesRef = collection(this.afs.firestore, 'largeImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }

  async getMediumImagesList(): Promise<Observable<imageItem[]>> {
    const imagesRef = collection(this.afs.firestore, 'mediumImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }

  async getSmallImagesList(): Promise<Observable<imageItem[]>> {
    const imagesRef = collection(this.afs.firestore, 'smallImageList');
    return collectionData(imagesRef, { idField: 'id' }) as Observable<
      imageItem[]
    >;
  }

  updateImages() {
    this.createImageHashMap();
    this.updateImageList();
  }

  createImageHashMap() {
    this.sortNotUsed().subscribe((item) => {
      item.forEach((item) => {
        this.hashAllImagesMap.set(item.caption, item);
      });
    });
  }

  async createImageMaps() {
    (await this.getOriginalImagesList()).subscribe(async (items) => {
      items.forEach((item) => {
        item.caption = item.caption.replace(/\.[^/.]+$/, '');
        this.hashOriginalMap.set(item.caption, item);
      });
    });

    (await this.getMediumImagesList()).subscribe(async (items) => {
      items.forEach((item) => {
        item.caption = item.caption
          .replace('_400x400', '')
          .replace(/\.[^/.]+$/, '')
          .replace('400/', '');
        this.hashMediumMap.set(item.caption, item);
      });
    });

    (await this.getLargeImagesList()).subscribe(async (items) => {
      items.forEach((item) => {
        item.caption = item.caption
          .replace('_800x800', '')
          .replace(/\.[^/.]+$/, '')
          .replace('800/', '');
        this.hashLargeMap.set(item.caption, item);
      });
      this.createImageMaps();
    });
  }

  async updateImageList(process: boolean = false) {
    console.debug(`Updating image list`);

    this.hashAllImagesMap.forEach((value, key) => {
      const originalImage = this.hashOriginalMap.get(key);
      if (originalImage) {
        if (originalImage.imageSrc !== value.imageSrc) {
          value.imageSrc = originalImage.imageSrc;
        }

        value.largeImageSrc = originalImage.imageSrc;
      }

      const largeImage = this.hashLargeMap.get(key);
      if (largeImage) {
        if (largeImage.imageSrc !== value.imageSrc800) {
          if (originalImage.imageSrc) {
            value.imageSrc800 = originalImage.imageSrc;
          }
        }
      }

      const mediumImage = this.hashMediumMap.get(key);
      if (mediumImage) {
        if (mediumImage.imageSrc !== value.imageSrc400) {
          if (originalImage.imageSrc) {
            process = true;
            value.imageSrc400 = originalImage.imageSrc;
          }
        }
      }
      this.imageItemCollections.doc(value.id).update(value);
      console.debug(`Updating ${value.caption}`);
    });
  }

  getImagesBySize(size: string) {
    return this.imageItems;
  }

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

  async deleteDuplicateImages() {
    await (
      await this.sortNotUsed()
    ).subscribe(async (item) => {
      if (item.length > 0) {
        this.deletefFromFirebase(await this.deleteDupes(item));
      }
    });
  }

  async deleteDupes(not_usedImages: imageItem[]) {
    console.debug(
      `Number un-used images in the imageList: ${not_usedImages.length}`
    );
    let found = false;
    let dupes: string[] = [];
    this.rawIndexArray = [];
    not_usedImages.forEach(async (items) => {
      found = this.doesItemDuplicateExist(items, found);
      if (!found) {
        this.rawIndexArray.push(items);
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
    this.imageIndexArray.forEach((img) => {
      if (img.fileName === image.imageAlt) {
        found = true;
      }
    });
    return found;
  }

  deletefFromFirebase(dupes: string[]) {
    console.debug(`Deleting duplicates :${dupes.length}`);
    dupes.forEach(async (dupeid) => {
      this.imageItemCollections.doc(dupeid).delete();
    });
  }





  // Create and retrieve the original index image collection

  imageIndexMap: imageItemIndexMap = {};

  private rawImageItems: Observable<rawImageItem[]>;

  async getImageIndexList() {
    return this.imageIndexItems;
  }

  imageIndexCollections =  this.afs.collection<imageItemIndex>('originalImageList');
  imageIndexItems = this.imageIndexCollections.valueChanges({ idField: 'id', });

  createOriginalItem(image: imageItemIndex) {
    this.imageIndexCollections.add(image).then((imgIndex) => {
      this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
    });
  }

  ImagesIndexArray: imageItemIndex[];


}
