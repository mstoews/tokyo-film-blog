import { Component, Inject, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/5.models/category';
import { Product} from 'app/5.models/products';
import { CategoryService } from 'app/4.services/category.service';
import { ProductsService } from 'app/4.services/products.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponentDialog implements OnDestroy{
  description: string;
  categories: Category[];
  updated_category: string;
  category$: Observable<Category[]>;
  form: FormGroup;
  productId: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private product: Product,
    private readonly productService: ProductsService,
    private readonly categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddComponentDialog>,
    private route: Router
  ) {
    this.description = product.description;
    this.createForm();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
    this.category$.pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
      this.categories = result;
    });
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
    const newProductPartial = { ...this.form.value } as Product;
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
  product: Product
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
