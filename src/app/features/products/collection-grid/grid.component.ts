import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private route: Router,
    private productService: ProductsService)
    { }

  backToHome() {
    this.route.navigate(['main']);
  }


  ngOnInit(): void {
    this.Products$ = this.productService.getAll();
  }

}
