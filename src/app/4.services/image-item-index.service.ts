import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItemIndex } from 'app/5.models/imageItem';
import { Observable, Subject, map } from 'rxjs';
import { DeleteDuplicateService } from './delete-duplicate.service';

@Injectable({
  providedIn: 'root',
})
export class ImageItemIndexService {
  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  dup = inject(DeleteDuplicateService)

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  hashUsedImagesMap = new Map<string, imageItemIndex>();
  hashOriginalIndexMap = new Map<string, imageItemIndex>();
  hashImageItemMap = new Map<string, imageItemIndex>();

  itemsCollection = this.afs.collection<imageItemIndex[]>(
    'originalImageList',
    (ref) => ref.orderBy('ranking')
  );
  imageItems = this.itemsCollection.valueChanges({ idField: 'id' });

  imageIndexCollections = this.afs.collection<imageItemIndex>(
    'originalImageList',
    (ref) => ref.orderBy('ranking')
  );
  imageIndexItems = this.imageIndexCollections.valueChanges({ idField: 'id' });

  createOriginalItem(image: imageItemIndex) {
    this.imageIndexCollections.add(image).then((imgIndex) => {
      this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
    });
  }

  async getImagesByType(productId: string) {
    return this.getImageByType(productId);
  }

  updateCollectionDescription(imgItem: imageItemIndex) {
    this.imageIndexCollections.doc(imgItem.id).update(imgItem);
  }

  setCollectionDescription(imgItem: imageItemIndex) {
    this.imageIndexCollections.doc(imgItem.id).set(imgItem);
  }

  async getImageIndexList() {
    return this.imageIndexItems;
  }

  async sortNotUsed() {
    return (await this.getOriginalImageListByType('IN_NOT_USED')).pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.caption < b.caption ? -1 : 1;
        });
        return data;
      })
    );
  }

  getAllImages(type: string) {
    if (type === null || type === undefined || type === '') {
      let imageIndexCollections = this.afs.collection<imageItemIndex>(
        'originalImageList',
        (ref) => ref.orderBy('ranking')
      );
      let imageIndexItems = imageIndexCollections.valueChanges({
        idField: 'id',
      });
      return imageIndexItems;
    } else {
      let imageIndexCollections = this.afs.collection<imageItemIndex>(
        'originalImageList',
        (ref) => ref.orderBy('ranking')
      );
      let imageIndexItems = imageIndexCollections
        .valueChanges({ idField: 'id' })
        .pipe(map((images) => images.filter((types) => types.type === type)));
      return imageIndexItems;
    }
  }

  getImagesByTypeId(id: string) {
    this.imageIndexItems.pipe( map((images) => images.filter((type) => type.type === id)));
  }


  async getImageByType(type: string) {
    return (await this.getImageIndexList()).pipe(
      map((images) => images.filter((image) => image.type === type))
    );
  }

  async getOriginalImageListByType(type: string) {
    return (await this.getImageIndexList()).pipe(
      map((images) => images.filter((image) => image.type === type))
    );
  }

  async createOriginalIndexMaps(): Promise<void> {
    this.hashOriginalIndexMap.clear();
    this.getAllImages('').subscribe((images) => {
      images.forEach((image) => {
        this.hashOriginalIndexMap.set(image.fileName, image);
      });
    });
  }

  getUsedImagesList() {
    return this.imageIndexItems.pipe(
      map((images) => images.filter((type) => type.type !== 'IN_NOT_USED'))
    );
  }

  updateImageList(item: imageItemIndex) {
    this.imageIndexCollections.doc(item.id).update(item);
  }

  delete(id: string) {
    this.imageIndexCollections.doc(id).delete();
  }

  async updateUsedImageList(): Promise<void> {
    this.hashUsedImagesMap.forEach((value, key) => {
      var fileExt = value.imageAlt.split('.').pop();
      let fileName = value.imageAlt.replace(/\.[^/.]+$/, '');
      fileName = fileName.replace(`thumbnails/`, '').replace(`_200x200`, '');
      fileName = fileName.replace(`400/`, '').replace(`_400x400`, '');
      fileName = fileName.replace(`800/`, '').replace(`_800x800`, '');
      fileName = `${fileName}.${fileExt}`;
      let usedItem = this.hashOriginalIndexMap.get(fileName);
      if (usedItem !== undefined) {
        usedItem.type = value.type;
        usedItem.caption = value.caption;
        usedItem.ranking = value.ranking;
        usedItem.parentId = value.parentId;
        usedItem.imageSrc = value.imageSrc;
        this.imageIndexCollections.doc(usedItem.id).update(usedItem);
      }
    });
  }

  async updateMainImageList(): Promise<void> {
    let ranking = 0;
    this.storage
      .ref('/')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((downloadURL) => {
            imageRef.getMetadata().then((meta) => {
              meta.contentType;

              const imageUrl = downloadURL;
              const imageData: imageItemIndex = {
                parentId: '',
                caption: imageRef.fullPath,
                type: 'IN_NOT_USED',
                imageSrc: imageUrl,
                fullPath: imageRef.fullPath,
                fileName: imageRef.name,
                size: 'original',
                imageAlt: imageRef.name,
                ranking: ranking,
                contentType: meta.contentType,
                id: '',
              };
              console.debug('Map Size', this.hashImageItemMap.size);

              const file = this.hashImageItemMap.get(imageData.fileName);
              if (file === undefined || file === null) {
                //this.setCollectionDescription(imageData);
                console.debug(`Added ${imageData.fileName}`);
              }
            });
          });
          console.debug('createRawImagesList_200 completed');
        });
      });
  }
}
