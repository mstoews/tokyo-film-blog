import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { Product } from 'app/models/products';
import { AuthService } from 'app/services/auth/auth.service';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponentDialog {
  description: string;
  categories: Category[];
  updated_category: string;
  category$: Observable<Category[]>;
  form: FormGroup;
  productId: string;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private product: Product ,
              private readonly productService : ProductsService,
              private readonly categoryService: CategoryService,
              private dialogRef: MatDialogRef<AddComponentDialog>,
              private afs: AngularFirestore,
              private auth: AuthService,
              private route: Router) {
              this.description = product.description;
              this.createForm(product);
  }

  ngOnInit() {
    this.productId = this.afs.createId();
    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });
  }

  createForm(prd: Product) {

     prd.brand = '';

    this.form = this.fb.group({
      id: this.productId,
      category: [prd.category,  Validators.required],
      description: [prd.description, Validators.required],
      date_created: [new Date(), Validators.required],
      rich_description: [prd.rich_description, Validators.required],
      image: [prd.image],
      brand: [prd.brand],
      price: [prd.price],
      rating: [prd.rating],
      is_featured: [prd.is_featured],
      user_updated: [prd.user_updated],
      date_updated: [prd.date_updated],
    });
  }

  update(results: any) {

    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];

    const newProduct = { ...this.form.value } as Product;
    newProduct.id = this.productId,
    newProduct.brand = 'TBD'
    newProduct.image = 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2FC30990B4-ABEF-4DB3-A2EF-714AA1C0C10F_800x800.JPG?alt=media&token=fdb15020-9a6d-4ce8-9cb9-fea465f8fa62';
    newProduct.rich_description = newProduct.description,
    newProduct.price = 0,
    newProduct.rating = '5',
    newProduct.is_featured  = 'Featured',
    newProduct.user_updated = '',
    newProduct.date_updated = updateDate,
    newProduct.date_created = updateDate
    this.productService.create(newProduct);
    this.form.setValue(newProduct);
    this.route.navigate(['admin/inventory', this.productId]);
    this.close();
  }

  changeCategory(category: any) {
    this.updated_category = category;
  }

  close() {

      this.dialogRef.close();

  }

}

export function openAddComponentDialog(dialog: MatDialog, product: Product) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";
  config.width = "400px"

  config.data = {
      ...product
  };

  const dialogRef = dialog.open(AddComponentDialog, config);

  return dialogRef.afterClosed();
}

