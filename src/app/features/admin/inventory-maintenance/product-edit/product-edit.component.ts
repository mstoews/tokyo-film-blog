import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category';
import { IImageStorage } from 'app/models/maintenance';
import { Product } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { imageItem } from 'app/models/imageItem';
import { ImageListService } from 'app/services/image-list.service';
import { DndComponent } from 'app/components/loaddnd/dnd.component';

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
    private fb: FormBuilder
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

    // if (this.inventoryImages$) {
    //   this.inventoryImages$.subscribe((image) => {
    //     image.forEach((img) => {
    //       counter++;
    //       const image: imageItem = {
    //         id: this.productId,
    //         parentId: this.productId,
    //         imageSrc: img.url,
    //         caption: img.name,
    //         type: this.IN_FEATURED,
    //         imageAlt: 'Inventory Image',
    //         ranking: counter,
    //       };
    //       this.imageArray.push(image);
    //     });
    //   });
    // }
  }

  onDelete(data: Product) {

    data = this.prdGroup.getRawValue();
    this.productService.delete(data.id.toString());
    this.route.navigate(['admin/inventory']);
  }

  onUpdate() {
    const product = { ...this.prdGroup.value } as Product;
    const dDate = new Date();
    product.rich_description = this.rich_description;
    const updateDate = dDate.toISOString().split('T')[0];
    // data.date_updated = updateDate as FieldValue;
    this.productService.update(product);
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
      images: [''],
      brand: ['', Validators.required],
      price: ['', Validators.required ],
      category: ['', Validators.required ],
      rating: [''],
      is_featured: ['', Validators.required],
      user_updated: ['', Validators.required],
      date_created: [new Date(), Validators.required],
      date_updated: [new Date(), Validators.required],
      purchases_allowed: [true, Validators.requiredTrue]
    });
  }

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.prdGroup = this.fb.group({
      id: [prd.id],
      description: [prd.description],
      short_description: [prd.short_description],
      rich_description: [prd.rich_description],
      image: [prd.image],
      brand: [prd.brand],
      price: [prd.price],
      category: [prd.category],
      rating: [prd.rating],
      is_featured: [prd.is_featured],
      purchases_allowed: [prd.purchases_allowed],
      user_updated: [prd.user_updated],
      date_created: [prd.date_created],
      date_updated: [prd.date_updated],
    });
  }

  onBackToInventory() {
    this._location.back();
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
