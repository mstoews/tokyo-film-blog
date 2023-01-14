import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { Product } from 'app/models/products';
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

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private product: Product ,
              private readonly productService : ProductsService,
              private readonly categoryService: CategoryService,
              private dialogRef: MatDialogRef<AddComponentDialog>,
              private route: Router) {

              this.description = product.description;
              this.createForm(product);
  }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });
  }

  createForm(prd: Product) {

    this.form = this.fb.group({
      id: [prd.id],
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
    const newProduct = { ...this.form.value } as Product;
    newProduct.image = '';
    this.productService.create(newProduct);
    this.form.setValue(newProduct);
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

