import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem } from 'app/5.models/imageItem';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDuplicateService {

  // Inject dependencies
  afs = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  // local variables
  rawImagesArray: imageItem[] = [];

  imageItemCollections = this.afs.collection<imageItem>('imagelist', (ref) => ref.orderBy('ranking'));
  imageItems = this.imageItemCollections.valueChanges({ idField: 'id' });
  // updateItemsCollection = this.afs.collection<imageItem>('imagelist');



  getImagesBySize(size: string) {
    return this.imageItems.pipe(
      map((images) => images.filter((image) => image.imageAlt.includes(size)).filter((type) => type.type === 'IN_NOT_USED')));
  }

  // create a sorted list of the unused images
  sortNotUsed() {
    return  this.getImagesBySize('200').pipe(map((data) => {
      data.sort((a, b) => {
          return a.caption < b.caption ? -1 : 1;
       });
      return data;
      }))
  }


  deleteDuplicateImages() {
    this.sortNotUsed()
      .subscribe((item) => {
        if (item.length > 0) {
          this.deletefFromFirebase(this.deleteDupes(item));
        }
    });
  }

  deleteDupes(not_usedImages: imageItem[]) {
    console.log(`Number un-used images in the imageList: ${not_usedImages.length}`);
    let found = false;
    let dupes: string[] = [];
    this.rawImagesArray = [];
    not_usedImages.forEach(async (items) => {
      found = this.doesItemDuplicateExist(items, found);
      if (!found) {
        this.rawImagesArray.push(items);
      }
      else {
        dupes.push(items.id);
      }
      found = false;
    });
    return dupes
  }

  doesItemDuplicateExist(image: imageItem, found: boolean): boolean {
    // have to have at least one item in the array
    found = false;
    this.rawImagesArray.forEach((img) => {
        if (img.imageAlt === image.imageAlt) {
          found = true;
        }
     });
    return found
  }

  deletefFromFirebase(dupes: string[]) {
    console.log(`Deleting duplicates :${dupes.length}`);
    dupes.forEach(async (dupeid) => {
        this.imageItemCollections.doc(dupeid).delete();
    });
  }

}
