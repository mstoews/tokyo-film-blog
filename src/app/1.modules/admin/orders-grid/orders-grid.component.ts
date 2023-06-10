import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../4.services/products.service';
import { Product } from 'app/5.models/products';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { TitleStrategy } from '@angular/router';
import { DndComponent } from 'app/3.components/loaddnd/dnd.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'order-list',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.css'],
})
export class OrdersGridComponent implements OnInit {
  [x: string]: any;
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  prdGroup: FormGroup;
  action: string;
  party: string;
  sTitle: string;
  cPriority: string;
  cRAG: string;
  cType: string;
  currentDate: Date;
  product: Product;
  productId: string;
  current_Url: string;
  updated_category: string;
  selectedItemKeys: string;
  categories: Category[];

  allProducts$: Observable<Product[]>;
  category$: Observable<Category[]>;
  prd: any;

  Refresh() {
    this.allProducts$ = this.productService.getAll();
  }

  onImages() {
    // console.debug('onImages');
    const parentId = this.prdGroup.getRawValue();
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

  changeCategory(category: any) {
    this.updated_category = category;
    // console.debug(`update category ${this.updated_category}`);
  }

  constructor(
    private matDialog: MatDialog,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
    private fb: FormBuilder
  ) {
    this.prd = this.productType;
    this.createEmptyForm();
  }

  ngOnInit() {
    this.sTitle = 'Product Inventory and Images';
    this.allProducts$ = this.productService.getAll();
    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
      // console.debug(this.categories);
    });
  }

  onNotify(event: any) {
    // console.debug(event);
    this.prd = event;
    this.createForm(this.prd);
    this.toggleDrawer();
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

  openDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  onCellDoublClicked(e: any) {
    // console.debug(`onCellDoubleClicked: ${JSON.stringify(e.data)}`);
    this.current_Url = e.data.images;
    this.prdGroup.setValue(e.data);
    this.openDrawer();
  }

  onCellClicked(e: any) {
    // console.debug(`onCellClicked: ${JSON.stringify(e.data)}`);
    this.current_Url = e.data.images;
    this.prdGroup.setValue(e.data);
    this.openDrawer();
  }

  onFocusedRowChanged(e: any) {
    const rowData = e.row && e.row.data;
    // console.debug(`onFocusRowChanged ${JSON.stringify(rowData)}`)
    this.current_Url = rowData.images;
    this.prdGroup.setValue(rowData);
  }

  closeDrawer() {
    const opened = this.drawer.opened;
    if (opened === true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  selectionChanged(data: any) {
    // console.debug(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys;
  }

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  Add() {
    // console.debug('open drawer to add ... ');
    this.openDrawer();
  }

  Delete() {
    // console.debug('open drawer to delete ... ');
    this.openDrawer();
  }

  Clone() {
    // console.debug('open drawer to clone ... ');
    this.openDrawer();
  }

  onCreate() {
    const newProduct = { ...this.prdGroup.value } as Product;
    // console.debug(`onCreate ${newProduct}`);
    this.productService.create(newProduct);
  }

  onUpdate(data: Product) {
    data = this.prdGroup.getRawValue();
    data.category = this.updated_category;
    // console.debug(`onUpdate:  ${JSON.stringify(data)}`);
    this.productService.update(data);
  }

  onDelete(data: Product) {
    data = this.prdGroup.getRawValue();
    this.productService.delete(data.id.toString());
  }

  closeDialog() {
    this.closeDrawer();
  }

  public productType = {
    id: '',
    description: '',
    rich_description: '',
    image: '',
    images: '',
    brand: '',
    price: '',
    category: '',
    rating: '',
    is_featured: '',
    user_updated: '',
    date_created: '',
    date_updated: '',
  };

  createEmptyForm() {
    this.prdGroup = this.fb.group({
      id: [''],
      description: [''],
      rich_description: [''],
      image: [''],
      images: [''],
      brand: [''],
      price: [''],
      category: [''],
      rating: [''],
      is_featured: [''],
      user_updated: [''],
      date_created: [''],
      date_updated: [''],
    });
  }

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.prdGroup = this.fb.group({
      id: [prd.id],
      description: [prd.description],
      rich_description: [prd.rich_description],
      image: [prd.image],
      brand: [prd.brand],
      price: [prd.price],
      category: [prd.category],
      rating: [prd.rating],
      is_featured: [prd.is_featured],
      user_updated: [prd.user_updated],
      date_created: [prd.date_created],
      date_updated: [prd.date_updated],
    });
  }

  cols = [
    // { headerName: 'ID', field: 'id' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Detailed Description', field: 'rich_description' },
    // { headerName: 'Image', field: 'image' },
    // { headerName: 'Image List', field: 'images' },
    { headerName: 'Brand', field: 'brand' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Rating', field: 'rating' },
    { headerName: 'Featured', field: 'is_featured' },
    // { headerName: 'User', field: 'user_updated' },
    // { headerName: 'Date Created', field: 'date_created' },
    { headerName: 'Date Updated', field: 'date_updated' },
  ];
}
