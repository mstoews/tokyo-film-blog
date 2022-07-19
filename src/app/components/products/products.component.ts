import { Component, OnInit } from '@angular/core';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    SubscribeComponent,
    CommonModule,
    AngularFireStorageModule,
  ],
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ GoogleAuthProvider, AngularFireAuth ],
})
export class ProductsComponent implements OnInit {
  profileUrl: Observable<string | null> | undefined;
  private user!: firebase.User | null;
  public url!: string | null;
  constructor(
    private storage: AngularFireStorage,
    public auth: AngularFireAuth
  )
    {
      auth.authState.subscribe(user => {
      this.user = user;
      if (this.user) {
        // this.profileUrl = this.storage.ref(`profile/${this.user.uid}`).getDownloadURL();
        console.log(`${this.user.uid} user name : ${this.user.displayName}`);
        this.profileUrl = this.storage.ref('cassie_tie.jpg').getDownloadURL();
        this.profileUrl.subscribe(url => {
          console.log('URL for : ', url);
          this.url = url;
        });
      }
    });
  }

  ngOnInit() {}
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
