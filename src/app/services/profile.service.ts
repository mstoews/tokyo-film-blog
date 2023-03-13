import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, from, map, Observable } from 'rxjs';
import { ProfileModel } from 'app/models/profile';
import { AuthService } from './auth/auth.service';
import { convertSnaps } from './db-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Blog } from '../models/blog';
import { Mainpage } from '../models/mainpage';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileCollection: AngularFirestoreCollection<ProfileModel>;
  private profileItems: Observable<ProfileModel[]>;
  private userId: string;
  private email: string;

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public authService: AuthService,
    private snack: MatSnackBar
  ) {
    this.profileCollection = afs.collection<ProfileModel>(
      `users/${this.userId}/profile`
    );
    this.profileItems = this.profileCollection.valueChanges({ idField: 'id' });

    this.auth.user.subscribe((user) => {
      if (user !== null) {
        this.userId = user.uid;
        console.log('User id from profile service is : ', this.userId);
      }
    });

    this.authService
      .getUserId()
      .then((user) => {
        this.userId = user;
        console.debug('User ID from promise', this.userId);
      })
      .catch((e) => {
        console.error(e.message); // error caught ...
      });
  }

  getAll() {
    return this.profileItems;
    // .pipe(map(profile => profile.;
  }

  update(userId: string, profile: ProfileModel) {
    const profileCollection = this.afs.collection<ProfileModel>( `users/${userId}/profile` );
    profileCollection
      .doc(profile.id)
      .update(profile)
      .then((profile) => {
        this.snack.open(
          'Profile address has been updated to your profile ...',
          'Completed',
          { duration: 3000 }
        );
      })
      .catch((error) => {
        this.snack.open(
          'Profile address was NOT updated to your profile ...',
          error,
          { duration: 3000 }
        );
      })
      .finally();
  }

  add(userId: string, profile: ProfileModel) {
    const profileCollection = this.afs.collection(`users/${userId}/profile`);
    profileCollection
      .add(profile)
      .then((profile) => {
        this.snack.open(
          'Profile address has been updated to your profile ...',
          'Completed',
          { duration: 3000 }
        );
      })
      .catch((error) => {
        this.snack.open('Error adding new profile definition ... ', 'Error', { duration: 3000 });
      })
      .finally();
  }

  delete(name: string) {
    this.profileCollection.doc(name).delete();
  }
}
