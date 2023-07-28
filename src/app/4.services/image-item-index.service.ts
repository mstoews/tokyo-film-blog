import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem, imageItemIndex } from 'app/5.models/imageItem';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageItemIndexService {
  getImageIndexListByType(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.createOriginalIndexMaps();
    this.createUsedImageMaps()
  }

  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  hashUsedImagesMap = new Map<string, imageItem>();
  hashOriginalIndexMap = new Map<string, imageItemIndex>();
  hashImageItemMap = new Map<string, imageItem>();

  imageItemCollections = this.afs.collection<imageItem>('imagelist', (ref) => ref.orderBy('ranking'));
  imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });

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

  async getImageItemIndexByType(type: string) {
    return (await this.getImageIndexList()).pipe(
      map((images) => images.filter((image) => image.type === type))
    );
  }

  async getOriginalImageListByType(type: string) {
    return (await this.getImageIndexList()).pipe(
      map((images) =>  images.filter((image) => image.type === type)))
  };


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

  getUsedImagesList() {
    return this.imageItems.pipe(
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
}
