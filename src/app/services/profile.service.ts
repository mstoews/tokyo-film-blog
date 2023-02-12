import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { IProfile } from 'app/models/profile';
import { AuthService } from './auth/auth.service';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class profileService {
  private profileCollection: AngularFirestoreCollection<IProfile>;
  private profileItem$: Observable<IProfile[]>;

  constructor(public afs: AngularFirestore,
    public authService: AuthService) {
    
      console.log('User ID : ', this.authService.getUserId());
      
  }

  getUserProfile() : Observable<IProfile | undefined> { 
    const userId = this.authService.afAuth.currentUser;
    return this.afs
    .collection(`users/${userId}/profile`)
    .snapshotChanges()
    .pipe(
      map((snaps) => {
        const profile = convertSnaps<IProfile>(snaps);
        return profile.length == 1 ? profile[0] : undefined;
      }),
      first()
    );
  }

  create(profile: IProfile) {
    const userId = this.authService.getUserId();
    const collectionRef = this.afs.collection(`users/${userId}/cart/`);
    collectionRef.add(profile);
    // this.snack.open('Selection has been added to your cart ...', 'OK', { duration: 3000 });
  }

  update(profile: IProfile) {
    this.profileCollection.doc(profile.id.toString()).update(profile);
  }

  delete(name: string) {
    this.profileCollection.doc(name).delete();
  }
}
