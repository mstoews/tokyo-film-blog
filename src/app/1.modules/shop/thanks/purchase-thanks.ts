import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'purchase-thanks',
  templateUrl: './purchase-thanks.html',
  styleUrls: ['./purchase-thanks.css']
})
export class PurchaseThanksComponent {
  constructor(
    private route: Router ) {
  }

  backToShop() {
    this.route.navigate(['shop']);
  }
}
