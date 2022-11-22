import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knitting',
  templateUrl: './knitting.component.html',
  styleUrls: ['./knitting.component.css']
})
export class KnittingComponent implements OnInit {

  constructor (private router: Router ) { }

  onBackToLanding() {
    this.router.navigate(['/home'])
  }

  ngOnInit(): void {
  }

}
