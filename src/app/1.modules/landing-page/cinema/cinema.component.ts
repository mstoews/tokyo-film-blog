import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
})
export class CinemaComponent implements OnInit {
  constructor(private router: Router) {}
  header_title = 'Bespoke Cinema';
  Cinema_image = './assets/images/Cinema_image.jpeg';
  onContacts() {
    this.router.navigate(['/home/contacts']);
  }
  ngOnInit(): void {}
}
