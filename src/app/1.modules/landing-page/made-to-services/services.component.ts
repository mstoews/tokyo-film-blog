import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // features_image = './assets/images/Cinema.jpg';

  services_one = './assets/images/Cinema.jpg';

  services_two = './assets/images/knitting.jpg';

  services_three = './assets/images/repairs.jpg';

  services_four = './assets/images/bespoke_knitting.jpg';
  
  onServices(service: string) {
    // console.debug(service);
    this.router.navigate([service]);
  }
}
