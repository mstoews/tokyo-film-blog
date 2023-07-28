import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';

import { Observable } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Category } from 'app/5.models/category';
import { CategoryService } from 'app/4.services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem, imageItemIndex } from 'app/5.models/imageItem';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryGridComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  categoryGroup: FormGroup;
  currentDoc: string;
  sTitle: string;
  cRAG: string;

  category: any;
  collapsed = false;

  allCategories$: Observable<Category[]>;
  selectedItemKeys: any;

  auth = inject(AngularFireAuth);
  snackBar = inject(MatSnackBar);
  imageItemIndexService = inject(ImageItemIndexService);

  categoryService = inject(CategoryService);
  fb = inject(FormBuilder);

  thumbnailList$ =  this.imageItemIndexService.getImageIndexListByType('IN_CATEGORY');

  ngOnInit(): void {
    this.Refresh();
    this.createEmptyForm();
    this.cRAG = '#238823';
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['Id']);
    }
  };

  createEmptyForm() {
    this.categoryGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      jp_description: ['', Validators.required],
      createDate: [new Date().toISOString().split('T')[0], Validators.required],
      updateDate: [new Date().toISOString().split('T')[0], Validators.required],
      updateBy: ['Admin'],
      image: ['', Validators.required],
    });
  }

  UpdateCategoryURL(e: imageItem) {
    this.categoryGroup.patchValue({
      image: e.imageSrc,
    });
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  onCellDoublClicked(e: any) {
    this.currentDoc = e.data.id;

    const dDate = new Date(e.data.updateDate);
    const updateDate = dDate.toISOString().split('T')[0];

    if (e.data.jp_description === undefined) {
      e.data.jp_description = '';
    }

    const data = {
      name: e.data.name,
      description: e.data.description,
      jp_description: e.data.jp_description,
      image: e.data.image,
      createDate: e.data.createDate,
      updateDate: updateDate,
      updateBy: e.data.updateBy,
    };
    this.categoryGroup.setValue(data);
    this.openDrawer();
  }

  onNotify(event: any) {
    this.categoryGroup.setValue(event.data);
    this.toggleDrawer();
  }

  openDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  closeDrawer() {
    const opened = this.drawer.opened;
    if (opened === true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  toggleDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      if (this.drawOpen === 'close') {
        this.drawer.toggle();
      }
    }
  }

  Refresh() {
    this.sTitle = 'Category Lists';
    this.allCategories$ = this.categoryService.getAll();
  }

  onCreate() {
    this.currentDoc = '';
    this.createEmptyForm();
    this.openDrawer();
  }


  onUpdate(category: Partial<Category>) {
    if (this.currentDoc !== '') {
      category.id = this.currentDoc;
      this.categoryService.update(category);
    } else {
      const data = {
        name: category.name,
        description: category.description,
        jp_description: category.jp_description,
        image: category.image,
        createDate: category.createDate,
        updateDate: category.updateDate,
        updateBy: category.updateBy,
      };
      this.categoryService.create(data);
    }

    this.snackBar.open('Category Updated', 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'bg-success',
      duration: 2000,
    });

    this.createEmptyForm();
  }

  UpdateInventoryItem(e: imageItem) {
    // e.type = this.productId;
    // this.imageListService.updateImageList(e);
  }

  onDelete(data: Category) {
    if (confirm('Are you sure to delete ' + data.description + '?')) {
      data.id = this.currentDoc;
      if (data.id === '') {
        return;
      }
      this.categoryService.delete(data.id);
      this.snackBar.open('Category Deleted', 'OK', { duration: 2000 });
      this.createEmptyForm();
    }
  }

}
