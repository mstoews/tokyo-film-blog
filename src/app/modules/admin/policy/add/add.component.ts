import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { ProductPartial } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddPolicyComponentDialog {
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
              private dialogRef: MatDialogRef<AddPolicyComponentDialog>,
              private route: Router) {
              this.description = product.description;
              this.createForm();
  }

  ngOnInit() {
    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      category: ['',  Validators.required],
      description: ['', Validators.required],
      rich_description:  ['', Validators.required],
      date_created: ['', Validators.required]
    });
  }



  update(results: any) {
    const newProductPartial = { ...this.form.value } as ProductPartial
    this.productService.createPartial(newProductPartial).then ( product => {
      this.productId = product.id;
      newProductPartial.id = this.productId;
      this.productService.updatePartial (newProductPartial);
      this.route.navigate(['admin/inventory', this.productId]);
    })

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

  const dialogRef = dialog.open(AddPolicyComponentDialog, config);

  return dialogRef.afterClosed();
}

