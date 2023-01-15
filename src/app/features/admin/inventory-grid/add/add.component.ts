import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { ProductPartial } from 'app/models/products';
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
              @Inject(MAT_DIALOG_DATA) private product: ProductPartial ,
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

  createForm(prd: ProductPartial) {
    this.form = this.fb.group({
      id: this.productId,
      category: [prd.category,  Validators.required],
      description: [prd.description, Validators.required],
      date_created: [new Date(), Validators.required]
    });
  }

  update(results: any) {
    const rawData = this.form.getRawValue()
    this.productService.updatePartial(rawData)
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

export function openAddComponentDialog(dialog: MatDialog, product: ProductPartial) {

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

