import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { MatDrawer } from '@angular/material/sidenav'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DndComponent } from 'app/components/loaddnd/dnd.component'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Category } from 'app/models/category'
import { CategoryService } from 'app/services/category.service'

@Component({
  selector: 'category-list',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
})
export class CategoryGridComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer
  drawOpen: 'open' | 'close' = 'open'
  categoryGroup: FormGroup
  sTitle: string
  cRAG: string

  category: any
  collapsed = false

  allCategories$: Observable<Category[]>
  selectedItemKeys: any

  constructor(
    private matDialog: MatDialog,
    private auth: AngularFireAuth,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.category = this.categoryType
  }

  ngOnInit() {
    this.Refresh()
    this.cRAG = '#238823'
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true
      e.component.expandRow(['Id'])
    }
  }

  selectionChanged(data: any) {
    // console.log(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys
  }

  onImages() {
    // console.log('onImages');
    const parentId = this.categoryGroup.getRawValue()
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: parentId.id,
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' }
      }
      switch (result.event) {
        case 'Create':
          // console.log(`create Images to save: ${JSON.stringify(result.data)}`);
          this.create(result)
          break
        case 'Cancel':
          // console.log(`Image transfer cancelled`);
          break
      }
    })
  }

  create(data: any) {
    const rawData = this.categoryGroup.getRawValue()
    this.categoryService.update(rawData)
  }

  onCellDoublClicked(e: any) {
    this.categoryGroup.setValue(e.data)
    this.openDrawer()
  }

  onNotify(event: any) {
    this.categoryGroup.setValue(event.data)
    this.toggleDrawer()
  }

  onFocusedRowChanged(e: any) {
    const rowData = e.row && e.row.data
    // console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`);
    this.categoryGroup.setValue(rowData)
    this.openDrawer()
  }

  openDrawer() {
    const opened = this.drawer.opened
    if (opened !== true) {
      this.drawer.toggle()
    } else {
      return
    }
  }

  closeDrawer() {
    const opened = this.drawer.opened
    if (opened === true) {
      this.drawer.toggle()
    } else {
      return
    }
  }

  Delete() {
    // console.log('open drawer to delete ... ');
    this.openDrawer()
  }

  Clone() {
    // console.log('open drawer to clone ... ');
    this.openDrawer()
  }

  Refresh() {
    this.sTitle = 'Category Lists'
    this.createEmptyForm()
    this.allCategories$ = this.categoryService.getAll()
  }

  onCreate() {
    const newCategory = { ...this.categoryGroup.value } as Category
    this.categoryService.create(newCategory)
  }

  toggleDrawer() {
    const opened = this.drawer.opened
    if (opened !== true) {
      this.drawer.toggle()
    } else {
      if (this.drawOpen === 'close') {
        this.drawer.toggle()
      }
    }
  }

  dateFormatter(params: any) {
    const dateAsString = params.value
    const dateParts = dateAsString.split('-')
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`
  }

  onUpdate(data: Category) {
    data = this.categoryGroup.getRawValue()

    // console.log(`onUpdate: ${JSON.stringify(data)}`);
    this.categoryService.update(data)
  }

  onDelete(data: Category) {
    data = this.categoryGroup.getRawValue()
    // console.log(`onDelete: ${data}`);
    this.categoryService.delete(data.id)
  }

  closeDialog() {
    this.drawer.toggle()
  }

  public categoryType = {
    name: '',
  }

  onAdd(){
    this.createEmptyForm();
    this.openDrawer();
  }

  createEmptyForm() {
    this.categoryGroup = this.fb.group({
      id: [''],
      name: [''],
    })
  }

  createForm(category: Category) {
    this.sTitle = 'Category'

    this.categoryGroup = this.fb.group({
      id: [category.id],
      name: [category.name],
    })
  }
}
