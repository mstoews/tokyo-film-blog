import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop',
  templateUrl: './main-shop.component.html',
  styleUrls: ['./main-shop.component.css']
})
export class MainShopComponent implements OnInit {

dropdown: boolean = false
filters: boolean = false

showDropdown(){
  this.dropdown =! this.dropdown
}

filtershow(){
  this.filters =! this.filters
}

  constructor () {}
  ngOnInit(): void {}
}
