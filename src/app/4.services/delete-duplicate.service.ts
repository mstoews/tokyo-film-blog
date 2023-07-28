import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collection, collectionData } from '@angular/fire/firestore';
import { imageItem, imageItemIndex, imageItemIndexMap } from 'app/5.models/imageItem';
import { Observable, Subscription, filter, map, shareReplay } from 'rxjs';
import { rawImageItem } from 'app/5.models/rawImagesList';


@Injectable({
  providedIn: 'root',
})
export class DeleteDuplicateService implements OnDestroy {

  hashLargeMap = new Map<string, imageItem>();
  hashOriginalMap = new Map<string, imageItem>();
  hashMediumMap = new Map<string, imageItem>();
  hashSmallMap = new Map<string, imageItem>();
  hashAllImagesMap = new Map<string, imageItem>();
  hashUsedImagesMap = new Map<string, imageItem>();


  constructor() {
      this.createOriginalIndexMaps();
      this.createImageListMap();
      this.createUsedImageMaps()
  }

  ngOnDestroy(): void {

  }
  // Inject dependencies
  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  // local variables
  imageIndexArray: imageItemIndex[] = [];
  rawIndexArray: imageItem[] = [];

  hashOriginalIndexMap = new Map<string, imageItemIndex>();
  hashImageItemMap = new Map<string, imageItem>();

  image_OriginalItemCollections = this.afs.collection<imageItem>('originalImageList');
  image_OriginalItems = this.image_OriginalItemCollections.valueChanges({ idField: 'id', });
  sub: Subscription

  imageIndexMap: imageItemIndexMap = {};

  private rawImageItems: Observable<rawImageItem[]>;

  imageIndexCollections = this.afs.collection<imageItemIndex>('originalImageList');
  imageIndexItems = this.imageIndexCollections.valueChanges({ idField: 'id', });

  createOriginalItem(image: imageItemIndex) {
    this.imageIndexCollections.add(image).then((imgIndex) => {
      this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
    });
  }

  async getImageIndexList() {
    return this.imageIndexItems;
  }

  async createOriginalIndexMaps(): Promise<void> {
    this.hashOriginalIndexMap.clear();
    (await this.getImageIndexList()).subscribe(async (items) => {
      items.forEach((item) => {
        this.hashOriginalIndexMap.set(item.fileName, item);
      });
    });
  }

  async createUsedImageMaps(): Promise<void> {
    this.hashUsedImagesMap.clear();
    (await this.getUsedImagesList()).subscribe(async (items) => {
      items.forEach((item) => {
        this.hashUsedImagesMap.set(item.id, item);
      });
    });
  }


  async createImageListMap(): Promise<void> {
    this.hashImageItemMap.clear();
    (await this.getImagesBySize('200')).subscribe(async (items) => {
      items.forEach((item) => {
        this.hashImageItemMap.set(item.imageAlt, item);
      });
    });
  }

  async createMainImageList(): Promise<void> {
      console.debug(this.hashOriginalIndexMap.size);
      this.storage
        .ref('/')
        .listAll()
        .subscribe((files) => {
          files.items.forEach((imageRef) => {
            imageRef.getMetadata().then((meta) => {
              const imageData: imageItemIndex = {
                id: '',
                fullPath: meta.fullPath,
                size: 'original',
                fileName: meta.name,
                contentType: meta.contentType
              };
              let found = false;

              if (this.hashOriginalIndexMap.get(imageData.fileName) === undefined) {
                  this.updateIndexItem(imageData);
                  console.debug(`Added ${imageData.fileName}`);
                }
            });
          });
        });
  }

  async updateUsedImageList(): Promise<void> {
    this.hashUsedImagesMap.forEach((value, key) => {
      console.debug(value.imageAlt);
      var fileExt = value.imageAlt.split('.').pop();
      let fileName = value.imageAlt.replace(/\.[^/.]+$/, "");
      fileName = fileName.replace(`thumbnails/`,'').replace(`_200x200`,'');
      fileName = fileName.replace(`400/`,'').replace(`_400x400`,'');
      fileName = fileName.replace(`800/`,'').replace(`_800x800`,'');
      fileName = `${fileName}.${fileExt}`;
      let usedItem = this.hashOriginalIndexMap.get(fileName);
      if (usedItem !== undefined) {
        usedItem.type = value.type;
        usedItem.caption= value.caption;
        usedItem.ranking= value.ranking;
        usedItem.parentId= value.parentId;
        usedItem.imageSrc = value.imageSrc;
        this.imageIndexCollections.doc(usedItem.id).update(usedItem);
      }
    });
  }

  async updateImageIndexList(size: string): Promise<void> {

    console.debug(this.hashOriginalIndexMap.size);

    this.hashOriginalIndexMap.forEach((value, key) => {

        var fileExt = value.fileName.split('.').pop();
        let fileName = value.fileName.replace(/\.[^/.]+$/, "");
        fileName = fileName.replace(`/${size}`,'').replace(`_${size}x${size}`,'');

        switch (size) {
          case '200':
            fileName = `/thumbnails/${fileName}_${size}x${size}.${fileExt}`;
               this.storage
              .ref(fileName)
              .getDownloadURL()
              .subscribe((smallSrc) => {
                console.debug(smallSrc);
                value.imageSrc200 = smallSrc;
                value.type = 'IN_NOT_USED';
                this.imageIndexCollections.doc(value.id).update(value);
              });
            break;

          case '400':
          fileName = `/${size}/${fileName}_${size}x${size}.${fileExt}`;
               this.storage
              .ref(fileName)
              .getDownloadURL()
              .subscribe((mediumSrc) => {

                value.imageSrc400 = mediumSrc;
                value.type = 'IN_NOT_USED';
                this.imageIndexCollections.doc(value.id).update(value);
                //this.imageItemCopyCol.doc(imgItem.id).update(imgItem);
              });
            break;

          case '800':
            fileName = `/${size}/${fileName}_${size}x${size}.${fileExt}`;
              this.storage
              .ref(fileName)
              .getDownloadURL()
              .subscribe((smallSrc) => {
                console.debug(smallSrc);
                value.imageSrc800 = smallSrc;
                value.type = 'IN_NOT_USED';
                this.imageIndexCollections.doc(value.id).update(value);

              });
            break;
          default:
            let fileNameDefault = `/${value.fileName}`;
              this.storage
              .ref(fileNameDefault)
              .getDownloadURL().subscribe((data) => {
                console.debug(data);
              });
            break;
        }
    });
  }

  async getImgFromServer(imgItem: imageItem): Promise<string> {
    let img = '';
    let size = '';
    if (imgItem.imageAlt.includes('200')) {
      size = '200';
    }
    if (imgItem.imageAlt.includes('400')) {
      size = '400';
    }
    if (imgItem.imageAlt.includes('800')) {
      size = '800';
    }

    var fileExt = imgItem.imageAlt.split('.').pop();
    let fileName = imgItem.imageAlt.replace(/\.[^/.]+$/, "");
    fileName = fileName.replace(`/${size}`,'').replace(`_${size}x${size}`,'');


    switch (size) {
      case '200':
        fileName = `/thumbnails/${fileName}_${size}x${size}.${fileExt}`;
        var pathReference = this.storage
          .ref(fileName)
          .getDownloadURL()
          .subscribe((smallSrc) => {
            console.debug(smallSrc);
            imgItem.imageSrc200 = smallSrc;
            imgItem.id = imgItem.imageAlt;

          });
        break;
      case '400':

      fileName = `/${size}/${fileName}_${size}x${size}.${fileExt}`;
        var pathReference = this.storage
          .ref(fileName)
          .getDownloadURL()
          .subscribe((smallSrc) => {
            console.debug(smallSrc);
            imgItem.imageSrc400 = smallSrc;
            imgItem.id = imgItem.imageAlt;
            //this.imageItemCopyCol.doc(imgItem.id).update(imgItem);
          });
        break;
      case '800':
        fileName = `/${size}/${fileName}_${size}x${size}.${fileExt}`;
        var pathReference = this.storage
          .ref(fileName)
          .getDownloadURL()
          .subscribe((smallSrc) => {
            console.debug(smallSrc);
            imgItem.imageSrc800 = smallSrc;
            imgItem.id = imgItem.imageAlt;
            //this.imageItemCopyCol.doc(imgItem.id).update(imgItem);
          });
        break;
      default:
        let fileNameDefault = `/thumbnails/${imgItem}`;
        var pathReferenceDefault = this.storage
          .ref(fileNameDefault)
          .getDownloadURL()

          .subscribe((data) => {
            console.debug(data);
            img = data;
          });
        break;
    }
    this.imageItemCollections.doc(imgItem.id).update(imgItem);
    return img;
  }


  getImagesList() {
    return this.imageItems.pipe(
      map((images) => images.filter((type) => type.type === 'IN_NOT_USED'))
    );
  }

  getUsedImagesList() {
    return this.imageItems.pipe(
      map((images) => images.filter((type) => type.type !== 'IN_NOT_USED'))
    );
  }





  updateIndexItem(imageData: imageItemIndex) {
    this.imageIndexCollections.add(imageData).then((img) => {
      imageData.id = img.id;
      this.imageIndexCollections.doc(imageData.id).update(imageData);
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

  imageItemCollections = this.afs.collection<imageItem>('imagelist', (ref) => ref.orderBy('ranking'));
  imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });

  // updateItemsCollection = this.afs.collection<imageItem>('imagelist');





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
    // this.updateImageList();
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


  getImagesBySize(size: string) {
    return this.imageItems.pipe(
      map((images) =>
        images
          .filter((image) => image.imageAlt.includes(size))
          .filter((type) => type.type !== 'IN_NOT_USED')
      )
    );
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


  ImagesIndexArray: imageItemIndex[];


}
