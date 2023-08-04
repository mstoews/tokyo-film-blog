import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, from, map, Observable } from 'rxjs';
import { Product, ProductPartial } from 'app/5.models/products';
import { convertSnaps } from './db-utils';
import { imageItemIndex } from 'app/5.models/imageItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageItemIndexService } from './image-item-index.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  [x: string]: any;
  private productsCollection: AngularFirestoreCollection<Product>;
  private inventoryItems: Observable<Product[]>;
  private productPartialCollection: AngularFirestoreCollection<ProductPartial>;

  constructor(
    public imageItemIndexService: ImageItemIndexService,
    public afs: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {
    this.productsCollection = afs.collection<Product>('inventory');
    this.inventoryItems = this.productsCollection.valueChanges({  idField: 'id', });
    this.productPartialCollection = afs.collection<ProductPartial>('inventory');
    this.inventoryPartialItems = this.productPartialCollection.valueChanges({ idField: 'id', });
  }



  createPartial(productPartial: ProductPartial) {
    return this.productPartialCollection.add(productPartial);
  }

  getAll() {
    return this.inventoryItems;
  }

  getAvailableInventory() {
    return this.getAll().pipe(
      map((inventory) =>
        inventory.filter((available) => available.purchases_allowed === true)
      )
    );
  }

  updateMainImage(product: Product) {
    this.afs.doc(`inventory/${product.id}`).set(product);
    console.debug('main image updated: ', product.image200);
    this.snackBar.open('Main image updated', 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-danger',
      duration: 2000,
    });
  }

  deleteEmptyInventory() {
    const allInventory = this.afs.collection<Product>('inventory');
    const allItems = allInventory.valueChanges();
    allItems.pipe(
      map((inventory) => {
        inventory.map((items) => {
          if (items.description === undefined) {
            console.debug(items.id);
          }
        });
      })
    );
  }

  get(id: string) {
    return this.productsCollection.doc(id).get();
  }

  getInventoryByCategory(category: string) {
    console.debug('getInventoryByCategory: ', category);
    if (category === 'All Categories' || category === null) {
      return this.getAvailableInventory();
    } else {
      return this.getAvailableInventory().pipe(
        map((inventory) =>
          inventory.filter((product) => product.category === category)
        )
      );
    }
  }

  getInventoryByCat(category: string) {
    if (category === null) {
      return this.getAvailableInventory();
    } else {
      return this.getAvailableInventory().pipe(
        map((inventory) =>
          inventory.filter((product) => product.category === category)
        )
      );
    }
  }

  getProductImage(parentId: string): any {
    var productImages: Observable<imageItemIndex[]>;
    var productImagesCollection: AngularFirestoreCollection<imageItemIndex>;
    productImagesCollection = this.afs.collection<imageItemIndex>(`inventory/${parentId}/images` );
    productImages = productImagesCollection.valueChanges({ idField: 'id' });
    return productImages.pipe(
      map((images) => images.filter((product) => product.parentId === parentId))
    );
  }

  async getImageListByProduct(productId: string) {
    return this.imageItemIndexService.getAllImages(productId);
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
