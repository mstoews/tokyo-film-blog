import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Contact } from 'app/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactCollection: AngularFirestoreCollection<Contact>;
  private contactItems: Observable<Contact[]>;

  constructor(public afs: AngularFirestore) {
    this.contactCollection = afs.collection<Contact>('contact')
    this.contactItems = this.contactCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    return this.contactItems;
  }

  create(contact: Contact) {
    this.contactCollection.add(contact);
  }

  update(contact: Contact) {
    this.contactCollection.doc(contact.id.toString()).update(contact);
  }

  delete(name: string) {
    this.contactCollection.doc(name).delete();
  }
}
