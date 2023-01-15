import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, from, map, Observable } from 'rxjs';
import { Product, ProductPartial } from 'app/models/products';
import { convertSnaps } from './db-utils';
import { imageItem } from 'app/models/imageItem';
import { ImageListService } from './image-list.service';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private inventoryItems: Observable<Product[]>;

  private productPartialCollection: AngularFirestoreCollection<ProductPartial>;
  private inventoryPartialItems: Observable<ProductPartial[]>;

  constructor(
    public afs: AngularFirestore,
    private imageListService: ImageListService
  ) {
    this.productsCollection = afs.collection<Product>('inventory');
    this.inventoryItems = this.productsCollection.valueChanges({ idField: 'id'});
    this.productPartialCollection = afs.collection<ProductPartial>('inventory');
    this.inventoryPartialItems = this.productPartialCollection.valueChanges({ idField: 'id'});
  }

  createPartial(productPartial: ProductPartial){
    return this.productPartialCollection.add(productPartial);
  }


  getAll() {
    return this.inventoryItems;
  }

  updateMainImage(productId: string, mainImage: string)
  {
    const image = {
      "image" : mainImage
    }
    this.afs.doc(`inventory/${productId}`).update( image );
  }

  deleteEmptyInventory() {
    var inventory: Observable<Product[]>;
    this.productsCollection = this.afs.collection('inventory');
    inventory = this.productsCollection.valueChanges();
    inventory.forEach((prod) => {
      console.log(prod.length);
    })


  }

  get(id: string) {
    return this.productsCollection.doc(id).get();
  }

  getFilteredInventory(category: string) {
    if (category === 'All Categories') {
      return this.inventoryItems;
    } else {
      return this.inventoryItems.pipe(
        map((images) =>
          images.filter((product) => product.category === category)
        )
      );
    }
  }

  getProductImage(parentId: string): any {
    var productImages: Observable<imageItem[]>;
    var productImagesCollection: AngularFirestoreCollection<imageItem>;
    productImagesCollection = this.afs.collection<imageItem>(
      `inventory/${parentId}/images`
    );
    productImages = productImagesCollection.valueChanges({ idField: 'id' });
    return productImages.pipe(
      map((images) => images.filter((product) => product.parentId === parentId))
    );
  }

  getImageListByProduct(productId: string) {
    return this.imageListService.getImagesByType(productId);
  }

  findProductByUrl(id: string): Observable<Product | undefined> {
    return this.afs
      .collection('inventory', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          const product = convertSnaps<Product>(snaps);
          return product.length == 1 ? product[0] : undefined;
        }),
        first()
      );
  }

  create(mtProduct: Product) {
    return from(this.productsCollection.add(mtProduct));
  }

  update(mtProduct: Product) {
    this.productsCollection.doc(mtProduct.id.toString()).update(mtProduct);
  }


  updatePartial(product: ProductPartial) {
    this.productPartialCollection.doc(product.id.toString()).update(product);
  }



  delete(id: string) {
    this.productsCollection.doc(id).delete();
  }
}
