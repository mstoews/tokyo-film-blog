import { Component, OnInit } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Observable } from 'rxjs/internal/Observable'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  profileUrl: Observable<string | null> | undefined

  public url!: string | null
  constructor() // private storage: AngularFireStorage,
  // public auth: AngularFireAuth
  {
    // auth.authState.subscribe(user => {
    // this.user = user;
    // if (this.user) {
    //   // this.profileUrl = this.storage.ref(`profile/${this.user.uid}`).getDownloadURL();
    //   // console.log(`${this.user.uid} user name : ${this.user.displayName}`);
    //   this.profileUrl = this.storage.ref('cassie_tie.jpg').getDownloadURL();
    //   this.profileUrl.subscribe(url => {
    //     // console.log('URL for : ', url);
    //     this.url = url;
    //   });
    // }
    // });
  }

  ngOnInit() {}

  login() {
    //  this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    //this.auth.signOut();
  }
}

/*
create table mt-products (
  ID text not null,
  prd_name text not null,
  description text not null,
  richDescription  text not null,
  image  text not null,
  images  text not null,
  brand  text not null,
  price  text not null,
  category  text not null,
  rating  text not null,
  isFeatured  text not null,
  dateCreated  text not null,
  dateUpdated  text not null,
  userUpdated  text not null,
)

create table mt-Orders (
 ID
 orderItems
 shippingAddress1
 shippingAddress2
 prefecture
 city
 postal_code
 country
 status
 totalPrice
 user
 dateOrdered
)

create table mt-order-items (
  ID
  product-id
  quantity
)

create table mt-categoy (
  ID
  category_name
  color
  icon
  image
)



*/
