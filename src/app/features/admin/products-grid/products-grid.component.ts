import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from 'app/models/products/mt-Products';


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
