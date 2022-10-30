import { Component, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'collection-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  Products$: Observable<Product[]>;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.Products$ = this.productService.getAll();
  }

}
