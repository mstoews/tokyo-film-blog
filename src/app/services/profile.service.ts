import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, from, map, Observable } from "rxjs";
import { ProfileModel } from 'app/models/profile';
import { AuthService } from './auth/auth.service';
import { convertSnaps } from './db-utils';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Blog } from "../models/blog";
import { Mainpage } from "../models/mainpage";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileCollection: AngularFirestoreCollection<ProfileModel>;
  private profileItems: Observable<ProfileModel[]>;
  private userId: string;
  private email: string;

  constructor(public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public authService: AuthService,
    private snack: MatSnackBar
  ) {
      this.auth.authState.subscribe((user) => {
      this.userId = user?.uid;
      console.log('User ID from subscribe : ', this.userId);
    });
      this.profileCollection = afs.collection<ProfileModel>(`users/${this.userId}/profile`);
      this.profileItems = this.profileCollection.valueChanges({idField: 'id'});

     this.authService.getUserId().then((user) => {
        this.userId = user;
        console.log('User ID from promise', this.userId);
     }).catch((e) => {
      console.error(e.message); // error caught ... 
    });
  }

  getAll() {
    return this.profileItems;
  }

  update(profile: ProfileModel) {
      const collectionRef = this.afs.collection(`users/${this.userId}/profile/`);
      collectionRef.doc(profile.id).update(profile);
      this.snack.open('Shipping address has been updated to your profile ...', 'Completed', { duration: 3000 });
  }

  add(profile: ProfileModel) {
    this.profileCollection.add(profile);
    this.snack.open('Shipping address has been added to your profile ...', 'Completed', { duration: 3000 });
  }

  delete(name: string) {
    this.profileCollection.doc(name).delete();
  }
}
