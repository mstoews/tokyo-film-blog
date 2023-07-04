import {
  Component,
  AfterViewInit,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DndComponent } from 'app/3.components/loaddnd/dnd.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Category } from 'app/5.models/category';
import { CategoryService } from 'app/4.services/category.service';


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

  constructor(
    private matDialog: MatDialog,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.category = this.categoryType;
  }

  auth = inject(AngularFireAuth);

  ngOnInit() {
    this.Refresh();
    this.cRAG = '#238823';
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['Id']);
    }
  };

  selectionChanged(data: any) {
    // console.debug(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys;
  }

  onImages() {
    // console.debug('onImages');
    const parentId = this.categoryGroup.getRawValue();
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: parentId.id,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          // console.debug(`create Images to save: ${JSON.stringify(result.data)}`);
          this.create(result);
          break;
        case 'Cancel':
          // console.debug(`Image transfer cancelled`);
          break;
      }
    });
  }

  create(data: any) {
    this.categoryService.update(data);
  }

  onCellDoublClicked(e: any) {
    this.currentDoc = e.data.id;
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    e.data.updateDate = updateDate;
  
    if (e.data.name === undefined) {
      e.data.name = '';
    }
    if (e.data.description === undefined) {
      e.data.description = '';
    }
    
    if (e.data.createDate === undefined) {
      e.data.createDate = updateDate;
  
    }
    if (e.data.updateBy === undefined || e.data.updateBy === null) {
      e.data.updateBy = '';
    }

    if (e.data.image === undefined || e.data.image === null) {
      e.data.image = 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/thumbnails%2FB1BB2A28-C895-4AA8-9072-948EE9FB2EAE_200x200.JPG?alt=media&token=4e5183f5-cd14-43af-99de-008e7f564a84';
    }


    console.log(`onCellDoublClicked ${JSON.stringify(e.data)}`);

    const data = {
      name: e.data.name,
      description: e.data.description,
      image: e.data.image,
      createDate: e.data.createDate,
      updateDate: e.data.updateDate,
      updateBy: e.data.updateBy,
    }
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

  Delete() {
    // console.debug('open drawer to delete ... ');
    this.openDrawer();
  }

  Clone() {
    // console.debug('open drawer to clone ... ');
    this.openDrawer();
  }

  Refresh() {
    this.sTitle = 'Category Lists';
    this.createEmptyForm();
    this.allCategories$ = this.categoryService.getAll();
  }

  onCreate() {
    const newCategory = { ...this.categoryGroup.value } as Category;
    this.categoryService.create(newCategory);
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

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  onUpdate(category: Partial<Category>) {
  
    console.log(`onUpdate: ${JSON.stringify(this.currentDoc)}`);
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    
    
    if (category.name === undefined || category.name === null) {
      category.name = '';
    }
    
    category.id = this.currentDoc;

    this.categoryService.update(category);
    this.Refresh();
  }

  onDelete(data: Category) {
    data = this.categoryGroup.getRawValue();
    // console.debug(`onDelete: ${data}`);
    this.categoryService.delete(data.id);
  }

  closeDialog() {
    this.drawer.toggle();
  }

  public categoryType = {
    name: '',
  };

  onAdd() {
    this.createEmptyForm();
    this.openDrawer();
  }

  createEmptyForm() {
    this.categoryGroup = this.fb.group({      
      name: [''],
      description: [''],
      image: [''],
      createDate: [''],
      updateDate: [''],
      updateBy: [''],
    });
  }

  createForm(category: Category) {
    this.sTitle = 'Category';

    this.categoryGroup = this.fb.group({
      name: [category.name],
      description: [category.description],
      image: [category.image],
      createDate: [category.createDate],
      updateDate: [category.updateDate],
      updateBy: [category.updateBy],
    });
  }
}
