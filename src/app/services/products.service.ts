import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { Product } from 'app/models/products';
import { convertSnaps } from './db-utils';
import { IImageStorage } from 'app/models/maintenance';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private inventoryItems: Observable<Product[]>;

  constructor(public afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('inventory')
    this.inventoryItems = this.productsCollection.valueChanges({idField: 'id'});
  }

  getAll() {
    console.log(`Inventory ${this.inventoryItems}`);
    return this.inventoryItems;
  }

  get(id: string) {
    return this.productsCollection.doc(id).get();
  }

  getProductImage(parentId: string): any {
    var productImages: Observable<IImageStorage[]>;
    var productImagesCollection: AngularFirestoreCollection<IImageStorage>;
    productImagesCollection = this.afs.collection<IImageStorage>(`inventory/${parentId}/images`);
    productImages = productImagesCollection.valueChanges({ idField: 'id' });
    return productImages;
  }


  findProductByUrl(id: string): Observable<Product | undefined > {
      return this.afs.collection('inventory',
          ref => ref.where("id", "==", id))
          .snapshotChanges()
          .pipe(
              map(snaps => {
                  const product = convertSnaps<Product>(snaps);
                  return product.length == 1 ? product[0]  : undefined
              }),
            first()
          );
  }



  create(mtProduct: Product) {
    this.productsCollection.add(mtProduct);
  }

  update(mtProduct: Product) {
    this.productsCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }

  delete(id: string) {
    this.productsCollection.doc(id).delete();
  }

}
