import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { IProducts } from 'app/interfaces/mt-products';
import {collection, collectionData, Firestore, query, where} from '@angular/fire/firestore';


@Component({
  selector: 'order-list',
  template: `
    <ng-container *ngIf="allProducts$ | async as rows">
    <grid-menubar></grid-menubar>
      <grid
        [cols]="cols"
        [rows]="rows"
        (notifyOpenDialog)="onNotify($event)"
      >
      </grid>
    </ng-container>
  `,
})

export class OrdersGridComponent implements OnInit  {


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
  

    constructor(
      private readonly productService: ProductsService, 
      private firestore: Firestore)   {
        const id = "1";
        const ref = collection(firestore, 'inventory');
        const q = query(ref, where('id', 'array-contains', id));
        const res$ = collectionData(q);
      }

    ngOnInit() {
      // for (let i = 0; i < 5; i++) {
      //   this.prod.id = i+10;
      //   this.productService.create(this.prod);
      // }
      this.allProducts$ = this.productService.getAll();
    }

    onNotify(event: any) {

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
    
}
