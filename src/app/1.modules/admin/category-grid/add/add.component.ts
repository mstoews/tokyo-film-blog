import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'app/5.models/category';
import { CategoryService } from 'app/4.services/category.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmCategoryDialog {
  description: string;

  categoryId: string;
  category$: Observable<Category[]>;
  form: FormGroup;
  updated_category: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private category: Category,
    private readonly categoryService: CategoryService,
    private dialogRef: MatDialogRef<ConfirmCategoryDialog>,
    private route: Router
  ) {
    this.description = category.name;
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.fb.group({
      id: [''],
      category: ['', Validators.required],
    });
  }

  
  changeCategory(category: any) {
    this.updated_category = category;
  }

  close() {
    this.dialogRef.close();
  }
}

export function openAddComponentDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';
  config.width = '400px';

  const dialogRef = dialog.open(AddCategoryDialog, config);

  return dialogRef.afterClosed();
}
