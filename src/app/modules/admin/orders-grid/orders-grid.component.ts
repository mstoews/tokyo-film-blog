import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from 'app/models/products/mt-Products';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'order-list',
  templateUrl: './orders-grid.component.html',
    styleUrls: ['./orders-grid.component.css'],
})

export class OrdersGridComponent implements OnInit  {
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
    product: IProduct;
    productId: string;
    current_Url: string;
    selectedItemKeys: string;

    allProducts$: Observable<IProduct[]>;
    prd: any;

    Refresh() {
      this.allProducts$ = this.productService.getAll();
    }

    constructor(
      private readonly productService: ProductsService,
      private fb: FormBuilder )
      {
      this.prd = this.productType;
      this.createEmptyForm();
      }

    ngOnInit() {
      this.sTitle = 'Product Inventory'
      this.allProducts$ = this.productService.getAll();
    }

    onNotify(event: any) {
      console.log(event);
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

    onCellDoublClicked(e: any ){
        console.log(`onCellDoubleClicked: ${JSON.stringify(e.data)}`);
        this.current_Url = e.data.images;
        this.prdGroup.setValue(e.data);
        this.openDrawer()
    }

    onCellClicked(e: any) {
        console.log(`onCellClicked: ${JSON.stringify(e.data)}`);
        this.current_Url = e.data.images;
        this.prdGroup.setValue(e.data);
        this.openDrawer()
    }

    onFocusedRowChanged(e: any){
        const rowData = e.row && e.row.data;
        console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`)
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
        console.log(`selectionChanged ${data}`);
        this.selectedItemKeys = data.selectedRowKeys;
    }

    dateFormatter(params: any) {
      const dateAsString = params.value;
      const dateParts = dateAsString.split('-');
      return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
    }

    Add() {
      console.log('open drawer to add ... ');
      this.openDrawer();
    }

    Delete() {
      console.log('open drawer to delete ... ');
      this.openDrawer();
    }

    Clone() {
      console.log('open drawer to clone ... ');
      this.openDrawer();
    }

    onCreate() {
      const newProduct = { ...this.prdGroup.value} as IProduct;
      console.log(`onCreate ${newProduct}`);
      this.productService.create(newProduct);
    }

    onUpdate(data: IProduct) {
      console.log(`onUpdate:  ${data}`);
      data = this.prdGroup.getRawValue();
      this.productService.update(data);
    }

    onDelete(data: IProduct) {
      data = this.prdGroup.getRawValue();
      this.productService.delete(data.id.toString());
    }

    closeDialog() {
      this.closeDrawer();
    }

    public productType = {
        id:                 '',
        description:        '',
        rich_description:   '',
        image:              '',
        images:             '',
        brand:              '',
        price:              '',
        category:           '',
        rating:             '',
        is_featured:        '',
        user_updated:       '',
        date_created:       '',
        date_updated:       '',
    }

    createEmptyForm() {
      this.prdGroup = this.fb.group({
        id:                 [''],
        description:        [''],
        rich_description:   [''],
        image:              [''],
        images:             [''],
        brand:              [''],
        price:              [''],
        category:           [''],
        rating:             [''],
        is_featured:        [''],
        user_updated:       [''],
        date_created:       [''],
        date_updated:       [''],
      });
    }

  createForm(prd: IProduct) {
    this.sTitle = 'Inventory - ' + prd.description;
    const dDate = new Date(prd.date_updated);
    const dueDate = dDate.toISOString().split('T')[0];
    const sDate = new Date(prd.date_created);
    const startDate = sDate.toISOString().split('T')[0];

    this.prdGroup = this.fb.group({
        id:                 [prd.id],
        description:        [prd.description],
        rich_description:   [prd.rich_description],
        image:              [prd.image],
        brand:              [prd.brand],
        price:              [prd.price],
        category:           [prd.category],
        rating:             [prd.rating],
        is_featured:        [prd.is_featured],
        user_updated:       [prd.user_updated],
        date_created:       [prd.date_created],
        date_updated:       [prd.date_updated]
    });
  }

  cols = [
   // { headerName: 'ID', field: 'id' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Detailed Description', field: 'rich_description'},
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
