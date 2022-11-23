import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  backToShopping(){
    this.route.navigate(['shop']);
  }

}
