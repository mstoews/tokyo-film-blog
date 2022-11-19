import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'app/models/products';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'app/services/category.service';
import { Category } from 'app/models/category';
import { TitleStrategy } from '@angular/router';
import { DndComponent } from 'app/components/loaddnd/dnd.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'app/models/item';
import { IImageStorage } from 'app/models/maintenance';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-grid.component.html',
    styleUrls: ['./inventory-grid.component.css'],
})

export class InventoryComponent implements OnInit  {

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
    data: IImageStorage[] = []

    allProducts$: Observable<Product[]>;
    category$: Observable<Category[]>;
    prd: any;

    constructor(
      private matDialog: MatDialog,
      private afs: AngularFirestore,
      private readonly categoryService: CategoryService,
      private readonly productService: ProductsService,
      private fb: FormBuilder )
      {
      this.prd = this.productType;
      this.createEmptyForm();
      }


    Refresh() {
      this.allProducts$ = this.productService.getAll();
    }

    onTabClick() {
      throw new Error('Method not implemented.');
      }


    /**
     * The dialogue entry is passed the current entry and parentId which is subsequently
     * passed back so the images collection can be created from the parent inventory item.
     * The parentID must exist before the image collection could be created.
     */

    onImages(): void {
      console.log('onImages');
      const parentId = this.prdGroup.getRawValue();
      const dialogRef = this.matDialog.open(DndComponent, {
        width: '500px',
        data: parentId.id
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === undefined) {
          result = { event: 'Cancel' };
        }
        switch (result.event) {
          case 'Create':
            console.log(`create Images to save: ${JSON.stringify(result.data)}`);
            this.create(result);
            break;
          case 'Cancel':
            console.log(`Image transfer cancelled`);
            break;
        }
      });
    }

    create(results: any ){
      const newProduct = { ...this.prdGroup.value} as Product;
      newProduct.image = results.data.url;
      this.productService.update(newProduct);
      this.prdGroup.setValue(newProduct);
      this.afs
      .collection('inventory')
      .doc(newProduct.id)
      .collection('images')
      .add(results.data);
    }

    changeCategory(category: any) {
      this.updated_category = category;
      console.log(`update category ${this.updated_category}`);
    }


    ngOnInit() {
      this.sTitle = 'Product Inventory and Images'
      this.allProducts$ = this.productService.getAll();
      this.category$ = this.categoryService.getAll()
      this.category$.subscribe(result => {
          this.categories = result;
          console.log(this.categories);
      });
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
        this.data = [];
        var counter = 0;
        this.current_Url = e.data.image;
        var Image: IImageStorage = {
          url: e.data.image,
          name: e.data.description,
          parentId: e.data.id,
          version_no: 1,
        }
        this.data.push(Image);
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
      const newProduct = { ...this.prdGroup.value} as Product;
      console.log(`onCreate ${newProduct}`);
      this.productService.create(newProduct);
    }

    onUpdate(data: Product) {
      data = this.prdGroup.getRawValue();
      data.category = this.updated_category;
      console.log(`onUpdate:  ${JSON.stringify(data)}`);
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

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

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

  onToggleDrawer(element: any) {
    console.log('Toggle the drawer!', element)
    this.data = [];
    var counter = 0;
    this.current_Url = element.image;
    console.log(JSON.stringify(element));
        // var Image: IImageStorage = {
        //   url: e.data.image,
        //   name: e.data.description,
        //   parentId: e.data.id,
        //   version_no: 1,
        // }
        // this.data.push(Image);
    this.prdGroup.setValue(element);
    this.openDrawer()
  }


  columnsToDisplay: string[] = [
    'actions',
    'description',
    'image',
    'rich_description',
    //'brand',
    'price',
   // 'category',
   // 'rating',
   // 'is_featured',
   // 'user_updated'
  ];
}
