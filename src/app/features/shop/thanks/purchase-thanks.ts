import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'purchase-thanks',
  templateUrl: './purchase-thanks.html',
  styleUrls: ['./purchase-thanks.css']
})
export class PurchaseThankdComponent {

  constructor(private route: Router, private _location: Location ) {

  }

  backToShop() {
    this._location.back()
  }
}
