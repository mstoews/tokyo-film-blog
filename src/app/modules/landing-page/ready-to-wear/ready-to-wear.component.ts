import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ready-to-wear',
  templateUrl: './ready-to-wear.component.html',
  styleUrls: ['./ready-to-wear.component.css'],
})
export class ReadyToWearComponent implements OnInit {
  onThoughts() {
   this.router.navigate(['/blog'])
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onBackToLanding() {
    this.router.navigate(['/home']);
  }
}
