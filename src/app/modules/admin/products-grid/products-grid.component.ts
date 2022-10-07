import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { IProduct } from 'app/interfaces/mt-products';


export type PriorityQuery = {
  priorityType: PriorityType[];
};

export interface PriorityType  {
  priority: string;
  description: string;
  updatedte: string;
  updateusr: string;
}
@Component({
  selector: 'products-list',
  template: `
    <ng-container *ngIf="allProducts$ | async as rows">
      <grid-menubar></grid-menubar>
      <grid

        [rows]="rows"
        (notifyOpenDialog)="onNotify($event)"
      >
      </grid>
    </ng-container>
  `,
})

export class ProductsGridComponent implements OnInit  {

    allProducts$: Observable<IProduct[]>;


    constructor(private readonly productService: ProductsService) {}

    ngOnInit(){
      this.allProducts$ = this.productService.getAll();
    }

    onNotify(event: any)
    {

    }
}
