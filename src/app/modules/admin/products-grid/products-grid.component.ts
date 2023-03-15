import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'app/models/products';


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

export class CreationsGridComponent implements OnInit  {

    allProducts$: Observable<Product[]>;

    constructor(private readonly productService: ProductsService) {}

    ngOnInit(){
      this.allProducts$ = this.productService.getAll();
    }

    onNotify(event: any)
    {

    }
}
