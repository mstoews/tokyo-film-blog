import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Services } from 'app/5.models/services';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private servicesCollection: AngularFirestoreCollection<Services>;
  private servicesItems: Observable<Services[]>;

  constructor(public afs: AngularFirestore) {
    this.servicesCollection = afs.collection<Services>('services');
    this.servicesItems = this.servicesCollection.valueChanges({
      idField: 'id',
    });
  }

  getAll() {
    return this.servicesItems;
  }

  create(services: Services) {
    this.servicesCollection.add(services);
  }

  update(services: Services) {
    this.servicesCollection.doc(services.id.toString()).update(services);
  }

  delete(name: string) {
    this.servicesCollection.doc(name).delete();
  }
}
