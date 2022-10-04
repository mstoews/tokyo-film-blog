import { Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type product = {
  name: string;
  price: number;
  description: string;
  image: string;
  images: [string];
  category: string;
  id: string;
};


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db = getFirestore();
  constructor() { }

  async addProduct(product: product) {
    const docRef = await addDoc(collection(this.db, "products"), { product });
    console.log("Document written with ID: ", docRef.id);
  } catch (e: string) {
    console.error("Error adding document: ", e);
  }



}
