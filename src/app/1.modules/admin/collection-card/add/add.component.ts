import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/5.models/category';
import { ProductPartial } from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponentDialog implements OnInit, OnDestroy {
  description: string;
  categories: Category[];
  updated_category: string;
  category$: Observable<Category[]>;
  form: FormGroup;
  productId: string;
  subCategeory: Subscription;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private product: ProductPartial,
    private readonly productService: ProductsService,
    private readonly categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddComponentDialog>,
    private route: Router
  ) {
    this.description = product.description;
    this.createForm();
  }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
    this.subCategeory = this.category$.subscribe((result) => {
      this.categories = result;
    });
  }

  ngOnDestroy() {
    this.subCategeory.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      category: ['', Validators.required],
      description: ['', Validators.required],
      rich_description: ['', Validators.required],
      date_created: ['', Validators.required],
    });
  }

  update(results: any) {
    const newProductPartial = { ...this.form.value } as ProductPartial;
    this.productService.createPartial(newProductPartial).then((product) => {
      this.productId = product.id;
      newProductPartial.id = this.productId;
      this.productService.updatePartial(newProductPartial);
      this.route.navigate(['admin/inventory', this.productId]);
    });

    this.close();
  }

  changeCategory(category: any) {
    this.updated_category = category;
  }

  close() {
    this.dialogRef.close();
  }
}

export function openAddComponentDialog(
  dialog: MatDialog,
  product: ProductPartial
) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';
  config.width = '400px';

  config.data = {
    ...product,
  };

  const dialogRef = dialog.open(AddComponentDialog, config);

  return dialogRef.afterClosed();
}
