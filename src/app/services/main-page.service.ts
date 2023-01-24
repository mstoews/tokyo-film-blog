import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Mainpage } from 'app/models/mainpage';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private mainpageCollection: AngularFirestoreCollection<Mainpage>;
  private mainpageItems: Observable<Mainpage[]>;

  constructor(public afs: AngularFirestore) {
    this.mainpageCollection = afs.collection<Mainpage>('mainpage')
    this.mainpageItems = this.mainpageCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    return this.mainpageItems;
  }

  create(mainpage: Mainpage) {
    this.mainpageCollection.add(mainpage);
  }

  update(mainpage: Mainpage) {
    mainpage.active = true;
    this.mainpageCollection.doc(mainpage.id.toString()).update(mainpage);
  }

  delete(name: string) {
    this.mainpageCollection.doc(name).delete();
  }
}
