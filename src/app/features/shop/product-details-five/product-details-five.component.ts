import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/models/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details-five',
  templateUrl: './product-details-five.component.html',
  styleUrls: ['./product-details-five.component.css']
})
export class ProductDetailsFiveComponent implements OnInit {

  productId: string;
  productItem: Observable<Product>;
  sub: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productId =  params['id']; // (+) converts string 'id' to a number
   });
   
  }

}
