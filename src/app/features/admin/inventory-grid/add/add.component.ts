import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Category } from 'app/models/category';
import { Product } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
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

  form = this.fb.group({
     description: [this.course.description, Validators.required],
     category: [this.course.category,  Validators.required],
     releasedAt: [new Date(), Validators.required],
     longDescription: [this.course.rich_description, Validators.required]
  });

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private course: Product ,
              private readonly categoryService: CategoryService,
              private dialogRef: MatDialogRef<AddComponentDialog>) {

      this.description = course.description;

  }

  ngOnInit() {

    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });

  }

  save() {

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

