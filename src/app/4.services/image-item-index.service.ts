import { Injectable, OnDestroy, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageItemIndex } from 'app/5.models/imageItem';
import {
  Observable,
  Subject,
  Subscription,
  map,
  shareReplay,
  takeUntil,
} from 'rxjs';
import { DeleteDuplicateService } from './delete-duplicate.service';
import { ProductsService } from './products.service';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Injectable({
  providedIn: 'root',
})
export class ImageItemIndexService implements OnDestroy {
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  dup = inject(DeleteDuplicateService);
  inventory = inject(ProductsService);
  private sub: Subscription;

  hashUsedImagesMap = new Map<string, ImageItemIndex>();
  hashOriginalIndexMap = new Map<string, ImageItemIndex>();
  hashImageItemMap = new Map<string, ImageItemIndex>();

  itemsCollection = this.afs.collection<ImageItemIndex[]>(
    'originalImageList',
    (ref) => ref.orderBy('ranking')
  );

  imageItems = this.itemsCollection.valueChanges({ idField: 'id' });

  imageIndexCollections = this.afs.collection<ImageItemIndex>(
    'originalImageList',
    (ref) => ref.orderBy('ranking')
  );

  imageIndexItems = this.imageIndexCollections.valueChanges({ idField: 'id' });

  createOriginalItem(image: ImageItemIndex) {
    this.imageIndexCollections.add(image).then((imgIndex) => {
      this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
    });
  }

  addIndexItem(imageData: ImageItemIndex) {
    this.imageIndexCollections.add(imageData).then((img) => {
      imageData.id = img.id;
      this.imageIndexCollections.doc(imageData.id).update(imageData);
    });
  }

  reNumber(type: string) {
    let ranking = 0;
    this.sub = this.getAllImages(type).subscribe((images) => {
      images.forEach((image) => {
        image.ranking = ranking;
        ranking++;
        this.imageIndexCollections.doc(image.id).update(image);
      });
    });
  }

  async getImagesByType(productId: string) {
    return this.getImageByType(productId);
  }

  updateImageCollectionDescription(imgItem: ImageItemIndex) {
    this.imageIndexCollections.doc(imgItem.id).update(imgItem);
  }

  addImageCollection(imgItem: ImageItemIndex) {
    this.imageIndexCollections.add(imgItem).then((imgIndex) => {
      this.imageIndexCollections.doc(imgIndex.id).update(imgIndex);
    });
  }

  setImageCollectionDescription(imgItem: ImageItemIndex) {
    this.imageIndexCollections.doc(imgItem.id).set(imgItem);
  }

  getImageIndexList() {
    return this.imageIndexItems;
  }

  sortNotUsed() {
    return this.getOriginalImageListByType('IN_NOT_USED').pipe(
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
      let imageIndexCollections =
        this.afs.collection<ImageItemIndex>('originalImageList');
      let imageIndexItems = imageIndexCollections.valueChanges({
        idField: 'id',
      });
      return imageIndexItems;
    } else {
      let imageIndexCollections = this.afs.collection<ImageItemIndex>(
        'originalImageList',
        (ref) => ref.orderBy('ranking')
      );
      let imageIndexItems = imageIndexCollections
        .valueChanges({ idField: 'id' })
        .pipe(map((images) => images.filter((types) => types.type === type)));
      return imageIndexItems;
    }
  }

  getImageLightboxList(category: string) {
    return this.getImagesByCategory(category).pipe(
      map((data: any) =>
        data.map(
          (item: ImageItemIndex & { id: string }) =>
            new ImageItem({
              src: item.imageSrc800,
              thumb: item.imageSrc200,
              alt: item.caption,
            })
        )
      )
    );
    shareReplay(1)
  }



  updateImageIndexList(size: string): void {
    console.debug(this.hashOriginalIndexMap.size);

    this.hashOriginalIndexMap.forEach((value, key) => {
      var fileExt = value.fileName.split('.').pop();
      let fileName = value.fileName.replace(/\.[^/.]+$/, '');
      fileName = fileName
        .replace(`/${size}`, '')
        .replace(`_${size}x${size}`, '');

      switch (size) {
        case '200':
          fileName = `/200/${fileName}_${size}x${size}.${fileExt}`;
          this.storage
            .ref(fileName)
            .getDownloadURL()
            .subscribe((smallSrc) => {
              console.debug(smallSrc);
              value.imageSrc200 = smallSrc;
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
              this.imageIndexCollections.doc(value.id).update(value);
            });
          break;
        default:
          let fileNameDefault = `/${value.fileName}`;
          this.storage
            .ref(fileNameDefault)
            .getDownloadURL()
            .subscribe((data) => {
              console.debug(data);
            });
          break;
      }
    });
  }

  getImagesByTypeId(id: string) {
    this.imageIndexItems.pipe(
      map((images) => images.filter((type) => type.type === id))
    );
  }

  async getImageByType(type: string) {
    return (await this.getImageIndexList()).pipe(
      map((images) => images.filter((image) => image.type === type))
    );
  }

  getImagesByCategory(category: string) {
    return this.getImageIndexList().pipe(
      map((images) => images.filter((image) => image.category === category))
    );
  }

  getOriginalImageListByType(type: string) {
    return this.getImageIndexList().pipe(
      map((images) => images.filter((image) => image.type === type))
    );
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  createOriginalIndexMaps(): void {
    this.hashOriginalIndexMap.clear();
    this.getAllImages('')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((images) => {
        images.forEach((image) => {
          this.hashOriginalIndexMap.set(image.fileName, image);
        });
        console.debug(this.hashOriginalIndexMap.size);
      });
  }

  getUsedImagesList() {
    return this.imageIndexItems.pipe(
      map((images) => images.filter((type) => type.type !== 'IN_NOT_USED'))
    );
  }

  updateImageList(item: ImageItemIndex, category: string, type: string) {
    item.category = category;
    item.type = type;
    this.imageIndexCollections.doc(item.id).update(item);
  }

  delete(id: string) {
    this.imageIndexCollections.doc(id).delete();
  }

  createOriginalImageMaps() {
    this.hashUsedImagesMap.clear();
    this.getUsedImagesList().subscribe(async (items) => {
      items.forEach((item) => {
        this.hashUsedImagesMap.set(item.id, item);
      });
    });
  }

  async updateUsedImageList(): Promise<void> {
    this.hashUsedImagesMap.forEach((value, key) => {
      var fileExt = value.imageAlt.split('.').pop();
      let fileName = value.imageAlt.replace(/\.[^/.]+$/, '');
      fileName = fileName.replace(`200/`, '').replace(`_200x200`, '');
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

  // this creates only a bare bones imageItemIndex
  // that then needs to call the update function to fill in all the sizes of the
  // images in the orginalimageList collection.

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
              const imageData: ImageItemIndex = {
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
                this.addIndexItem(imageData);
                this.hashImageItemMap.set(imageData.fileName, imageData);
              }
            });
          });
          console.debug('createRawImagesList_200 completed');
        });
      });
  }
  updateProductItems() {
    // this.sub = this.inventory.getAll().subscribe((products) => {
    //   products.forEach((product) => {
    //     this.getAllImages(product.id).forEach((images) => {
    //       images.forEach((image) => {
    //         image.category = 'IN_PRODUCTS';
    //         this.imageIndexCollections.doc(image.id).update(image);
    //       });
    //     });
    //   });
    // });
    // this.getAllImages('IN_COLLECTION').forEach((images) => {
    //   images.forEach((image) => {
    //     image.category = 'IN_COLLECTION';
    //     this.imageIndexCollections.doc(image.id).update(image);
    //   });
    // });
    // this.getAllImages('IN_INVENTORY').forEach((images) => {
    //   images.forEach((image) => {
    //     image.category = 'IN_NOT_USED';
    //     image.type = 'IN_NOT_USED';
    //     this.imageIndexCollections.doc(image.id).update(image);
    //   });
    // });
    // this.getAllImages('IN_GALLERY').forEach((images) => {
    //   images.forEach((image) => {
    //     image.category = 'IN_GALLERY';
    //     this.imageIndexCollections.doc(image.id).update(image);
    //   });
    // });
    // this.getAllImages('IN_FEATURED').forEach((images) => {
    //   images.forEach((image) => {
    //     image.category = 'IN_COLLECTION';
    //     image.type = 'IN_COLLECTION';
    //     this.imageIndexCollections.doc(image.id).update(image);
    //   });
    // });
    // this.getAllImages('IN_INVENTORY').forEach((images) => {
    //   images.forEach((image) => {
    //     image.category = 'IN_NOT_USED';
    //     this.imageIndexCollections.doc(image.id).update(image);
    //   });
    // });
  }
}
