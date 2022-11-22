import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tailoring',
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.css']
})
export class TailoringComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBackToLanding() {
    this.router.navigate(['/home'])
  }


}
