import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { IProducts } from 'app/interfaces/mt-products';
import { collection, collectionData, Firestore, query, where} from '@angular/fire/firestore';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'order-list',
  template: `
   <mat-drawer-container>
   <mat-drawer #drawer [opened]="false" mode="side" [position]="'end'" [disableClose]="false">
   <mat-card class="text-base bg-gray-100">
   <div mat-dialog-title [ngStyle]="{'border-left': '10px solid' + cRAG  }">{{sTitle}}</div>
<div mat-dialog-content>
    <form [formGroup]="prdGroup" (ngSubmit)="onUpdate(prdGroup.value)" class="form">

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '31%' }">
            <input matInput placeholder="ID" formControlName="id" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '31%' }">
            <input matInput placeholder="Brand" formControlName="brand" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '31%' }">
            <input matInput placeholder="Price" formControlName="price" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Description" formControlName="description" />
        </mat-form-field>
        
        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Rich Description" formControlName="rich_description" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Main Image" formControlName="image" />
        </mat-form-field>
        
        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '100%' }">
            <input matInput placeholder="Image List" formControlName="images" />
        </mat-form-field>

    
        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="Category" formControlName="category" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="Rating" formControlName="rating" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="Featured" formControlName="is_featured" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="User" formControlName="user_updated" />
        </mat-form-field>

        <mat-form-field class="form-element m-1" [ngStyle]="{ width: '48%' }">
            <input matInput placeholder="Created Date" type="date" id="date_created" formControlName="date_created" />
        </mat-form-field>

        <mat-form-field  class="form-element m-1" [ngStyle]="{ width: '48%' }" >
            <input matInput placeholder="Updated Date" type="date" id="date_updated" formControlName="date_updated" />
        </mat-form-field>


    </form>
</div>
<div mat-dialog-actions>
    <button mat-button (click)="onUpdate(product)" mat-flat-button color="primary">
        Update
    </button>
    <button mat-button (click)="onCreate(product)" mat-flat-button color="primary">
        Insert
    </button>
    <button mat-button (click)="onDelete(product)" mat-flat-button color="primary">
        Delete
    </button>
    <button mat-button (click)="closeDialog()" mat-flat-button color="warn">
        Close
    </button>
</div>
<div mat-dialog-actions>
    <mat-radio-group [(ngModel)]="drawOpen">
        <mat-radio-button class="example-margin" value="open">Remain Open</mat-radio-button>
        <mat-radio-button class="example-margin" value="close">Close on Complete</mat-radio-button>
    </mat-radio-group>
</div>
   </mat-card>
   </mat-drawer>
    <ng-container *ngIf="allProducts$ | async as rows">
    <grid-menubar [inTitle]="sTitle"></grid-menubar>
      <grid
        [cols]="cols"
        [rows]="rows"
        (notifyOpenDialog)="onNotify($event)"
      >
      </grid>
    </ng-container>
    <mat-drawer-container>
  `,
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
    product: IProducts;

    prod: {
    id:   number,
    description:   string,
    rich_description: string,
    image:     string,
    images:    string,
    brand:        string,
    price:        number,
    category:     string, 
    rating:       string, 
    is_featured:  string, 
    user_updated: string   
    date_created: string, 
    date_updated: string, 
    } =
  
    {
      id:   2,
      description: "Red Sweater",
      rich_description: "Super Red Sweater",
      image:        "Image",
      images:       "Second Image",
      brand:        "Cassie",
      price:         200.00,
      category:     "Sweater",
      rating:       "5",
      is_featured:  "True",
      user_updated: "MST",
      date_created: "2022-10-04",
      date_updated: "2022-10-04",  
  }


    allProducts$: Observable<IProducts[]>;
    prd: any;

    constructor(
      private readonly productService: ProductsService, 
      private fb: FormBuilder,
      private firestore: Firestore)   {
        this.prd = this.productType;
        this.createEmptyForm();
      }

    ngOnInit() {
      // for (let i = 0; i < 5; i++) {
      //   this.prod.id = i+10;
      //   this.productService.create(this.prod);
      // }
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

    dateFormatter(params: any) {
      const dateAsString = params.value;
      const dateParts = dateAsString.split('-');
      return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
    }
  
    cols = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Detailed Description', field: 'rich_description'},
      { headerName: 'Image', field: 'image' },
      { headerName: 'Image List', field: 'images' },
      { headerName: 'Brand', field: 'brand' },
      { headerName: 'Price', field: 'price' },
      { headerName: 'Category', field: 'category' },
      { headerName: 'Rating', field: 'rating' },
      { headerName: 'Featured', field: 'is_featured' },
      { headerName: 'User', field: 'user_updated' },
      { headerName: 'Date Created', field: 'date_created' },
      { headerName: 'Date Updated', field: 'date_updated' },
    ];

  onCreate(data: IProducts) {
      data = this.prdGroup.getRawValue();
      this.productService.create(data);
      
  }

  onUpdate(data: IProducts) {
      data = this.prdGroup.getRawValue();
      this.productService.update(data);
      
  }

  onDelete(data: IProducts) {
      data = this.prdGroup.getRawValue();
      this.productService.delete(data.id.toString());
      
  }
  
  closeDialog() {
    this.drawer.toggle();
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



createForm(prd: IProducts) {
    this.sTitle = 'Products  - ' + prd.id;

    const dDate = new Date(prd.date_updated);
    const dueDate = dDate.toISOString().split('T')[0];

    const sDate = new Date(prd.date_created);
    const startDate = sDate.toISOString().split('T')[0];

    this.prdGroup = this.fb.group({
        id:                 [prd.id],
        description:        [prd.description],
        rich_description:   [prd.rich_description],
        image:              [prd.image],
        images:             [prd.images],
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
}
