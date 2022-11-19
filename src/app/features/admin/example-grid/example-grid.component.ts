import { Component, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-example-grid',
  templateUrl: './example-grid.component.html',
  styleUrls: ['./example-grid.component.css'],
})
export class ExampleGridComponent implements OnInit {

  category: any;
  collapsed = false;

  allProducts$: Observable<Product[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.Refresh();
  }

  Refresh() {
    this.allProducts$ =  this.productService.getAll();
  }

  onCreate(element: any) {
    console.log('Toggle the drawer!', element)
  }

  columnsToDisplay: string[] = [
    'actions',
    'description',
    'image',
    'rich_description',
    'brand',
    'price',
    'category',
    'rating',
    'is_featured',
    'user_updated'];
}

