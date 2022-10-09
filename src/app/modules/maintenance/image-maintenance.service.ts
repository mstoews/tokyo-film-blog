import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IImageMaintenance } from 'app/interfaces/mt-ImageMaintenance';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ImageMaintenanceService {
  private mtImageMaintenanceCollection: AngularFirestoreCollection<IImageMaintenance>;
  private inventoryItems: Observable<IImageMaintenance[]>;

  constructor(public afs: AngularFirestore) {
    this.mtImageMaintenanceCollection = afs.collection<IImageMaintenance>('images')
    this.inventoryItems = this.mtImageMaintenanceCollection.valueChanges({idField: 'id'});

    // .snapshotChanges().pipe(
    //   map(changes => {
    //      return changes.map(a =>{
    //       const data = a.payload.doc.data() as any;
    //       Object.keys(data).filter(key => data[key] instanceof Timestamp)
    //                     .forEach(key => data[key] = data[key].toDate())
    //                 data._id = a.payload.doc.id;
    //                 console.log(data._id);
    //                 return data;
    //      } )

    //   })
    // );
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

  update(mtImage: IImageMaintenance) {
    this.mtImageMaintenanceCollection.doc(mtImage.id.toString()).update(mtImage);
  }

  delete(id: string) {
    this.mtImageMaintenanceCollection.doc(id).delete();
  }
}
