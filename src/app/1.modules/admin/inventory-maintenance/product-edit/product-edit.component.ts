import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/5.models/category';
import { IImageStorage } from 'app/5.models/maintenance';
import { Product } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { ProductsService } from 'app/4.services/products.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { imageItem } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';
import { DndComponent } from 'app/3.components/loaddnd/dnd.component';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  sTitle: any;
  rich_description: string;
  prdGroup: FormGroup;
  action: string;
  party: string;
  cPriority: string;
  cRAG: string;
  cType: string;
  currentDate: Date;
  product: Product;
  productId: string;
  current_Url: string;
  updated_category: string;
  selectedItemKeys: string;
  categories: Category[];
  imageArray: imageItem[] = [];
  inventoryImages$: Observable<IImageStorage[]>;
  isFormDirty = false;

  allProducts$: Observable<Product>;
  category$: Observable<Category[]>;
  prd: any;
  sub: any;
  productItem$: Observable<Product>;
  IN_FEATURED = 'IN_INVENTORY';

  constructor(
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private _location: Location,
    private afs: AngularFirestore,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
    private readonly imageListService: ImageListService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    // this.prd = this.productType;
    this.createEmptyForm();
  }

  ngOnInit() {
    var counter = 0;
    this.sTitle = 'Product Inventory and Images';
    this.sub = this.activateRoute.params.subscribe((params) => {
      const prd = this.productService.findProductByUrl(params['id']);
      if (prd) {
        this.productItem$ = prd;
        this.productId = params['id'];
        this.productItem$.subscribe((prd) => {
          if (prd !== undefined) {
            this.rich_description = prd.rich_description;
            this.createForm(prd);
          }
        });
      }
    });

    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });
  }

  onTabClick(event) {
    //console.log(event.tab.textLabel);
    const product = { ...this.prdGroup.value } as Product;
    this.onUpdate(product);
  }

  onDelete(data: Product) {
    data = this.prdGroup.getRawValue();
    this.productService.delete(data.id.toString());
    this.route.navigate(['admin/inventory']);
  }

  onUpdate(product: Product) {
    if (this.isFormDirty) {
      // const product = { ...this.prdGroup.value } as Product; const product = { ...this.prdGroup.value } as Product;
      //console.debug('Product can be sold ...: ', product.purchases_allowed);
      product.rich_description = this.rich_description;
      if (product.quantity === undefined || product.quantity === null) {
        product.quantity = 1;
      }

      if (
        product.quantity_increment === undefined ||
        product.quantity_increment === null
      ) {
        product.quantity_increment = 1;
      }

      const quantity_in = product.quantity_increment;

      const dDate = new Date();
      const updateDate = dDate.toISOString().split('T')[0];
      product.date_created = updateDate;
      this.productService.update(product);
      this.prdGroup.setValue(product);
      this.snackBar.open('Product updated successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open('No changes to save to the product', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }

    this.isFormDirty = false;
  }

  createProduct(results: any) {
    const newProduct = { ...this.prdGroup.value } as Product;
    newProduct.image = results.data.url;
    this.productService.update(newProduct);
    this.prdGroup.setValue(newProduct);
    this.afs
      .collection('inventory')
      .doc(newProduct.id)
      .collection('images')
      .add(results.data);
  }

  changeCategory(category: any) {
    this.updated_category = category;
  }

  createEmptyForm() {
    this.prdGroup = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      short_description: ['', Validators.required],
      rich_description: ['', Validators.required],
      image: [''],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      rating: [''],
      is_featured: ['', Validators.required],
      user_updated: [''],
      date_created: [new Date(), Validators.required],
      date_updated: [new Date(), Validators.required],
      purchases_allowed: [true, Validators.requiredTrue],
      quantity: [1, Validators.required],
      quantity_required: [true, Validators.required],
      quantity_increment: [1, Validators.required],
      is_active: [true, Validators.required],
    });
  }

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.prdGroup = this.fb.group({
      id: [prd.id],
      description: [prd.description, Validators.required],
      short_description: [prd.short_description, Validators.required],
      rich_description: [prd.rich_description, Validators.required],
      image: [prd.image , Validators.required],
      brand: [prd.brand, Validators.required],
      price: [prd.price, Validators.required],
      quantity_increment: [prd.quantity_increment, Validators.required],
      category: [prd.category, Validators.required],
      rating: [prd.rating , Validators.required],
      quantity: [prd.quantity, Validators.required],
      is_featured: [prd.is_featured, Validators.required],
      purchases_allowed: [prd.purchases_allowed,  Validators.required],
      quantity_required: [prd.quantity_required, Validators.required ],
      is_active: [prd.is_active,  Validators.required],
      user_updated: [prd.user_updated , Validators.required],
      date_created: [prd.date_created , Validators.required],
      date_updated: [prd.date_updated , Validators.required],
    });

    this.prdGroup.valueChanges.subscribe((x) => {
      this.isFormDirty = true;
    });
  }

  onValueChange()
  {
    this.isFormDirty = true;
    //console.log('Value changed in text editor');
  }

  onBackToInventory() {
    if (this.isFormDirty) {
      const product = { ...this.prdGroup.value } as Product;
      this.onUpdate(product);
    }
    this.route.navigate(['admin/inventory']);
  }

  onImages() {
    const parentId = this.prdGroup.getRawValue();
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: {
        parent: parentId.id,
        location: 'blog',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          //this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
  }

  public productType = {
    id: '',
    description: '',
    short_description: '',
    rich_description: '',
    image: '',
    images: '',
    brand: '',
    price: '',
    category: '',
    rating: '',
    is_featured: '',
    user_updated: '',
    date_created: '',
    date_updated: '',
  };

  onSweep() {
    this.productService.deleteEmptyInventory();
  }
}
