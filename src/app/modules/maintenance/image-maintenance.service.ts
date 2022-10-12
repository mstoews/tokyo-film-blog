import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IImageMaintenance, IImageStorage } from 'app/interfaces/mt-ImageMaintenance';

@Injectable({
  providedIn: 'root',
})
export class ImageMaintenanceService {
  private mtImageMaintenanceCollection: AngularFirestoreCollection<IImageMaintenance>;
  private mtImageStorageCollection: AngularFirestoreCollection<IImageStorage>;
  private inventoryItems: Observable<IImageMaintenance[]>;

  constructor(public afs: AngularFirestore) {
    this.mtImageMaintenanceCollection = afs.collection<IImageMaintenance>('images')
    this.mtImageStorageCollection = afs.collection<IImageStorage>('files')
    this.inventoryItems = this.mtImageMaintenanceCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Images ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
     this.mtImageMaintenanceCollection.doc(id).get();
  }

  create(mtImage: IImageMaintenance) {
    this.mtImageMaintenanceCollection.add(mtImage);
  }

  createImageFirebaseInput(mtImageStorage: IImageStorage)
  {
    console.log(mtImageStorage);
    this.mtImageStorageCollection.add(mtImageStorage);
  }

  getImageFile(id: string) {
    this.mtImageStorageCollection.doc(id).get();
  }

  update(mtImage: IImageMaintenance) {
    this.mtImageMaintenanceCollection.doc(mtImage.id.toString()).update(mtImage);
  }

  delete(id: string) {
    this.mtImageMaintenanceCollection.doc(id).delete();
  }
}
