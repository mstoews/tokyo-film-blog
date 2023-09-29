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
  // 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2F161714D0-73C9-4C75-8D15-B8B2F08EE5E1_800x800.JPG?alt=media&token=b5401a57-c7cb-415d-b185-35d59b30a0c7'
  services_one = './assets/images/Cinema.jpg';
  // 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2FcroppedforservicesCinema_400x400.JPG?alt=media&token=f5fcb885-70b8-4dfe-97ba-1db54699d7c1'
  services_two = './assets/images/knitting.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Fcroppedforservices_400x400.JPG?alt=media&token=78f54e83-17d4-4f8c-8eeb-1def74080f74'
  services_three = './assets/images/repairs.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Fcroppedforservicesmending_400x400.JPG?alt=media&token=20779c32-8bc3-4bc0-a9dd-86093ad5c061'
  services_four = './assets/images/bespoke_knitting.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Freadytowearcrop_400x400.JPEG?alt=media&token=ee82d3fa-82ed-402f-b364-17ec0024e3d8'
  // about_us = './assets/images/about.jpg';
  //  'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2F213E0BF3-EF7F-4C0F-AF24-86EA01398C81_800x800.jpeg?alt=media&token=120537a4-229d-4594-a787-41ff5ec4b42b'

  onServices(service: string) {
    // console.debug(service);
    this.router.navigate([service]);
  }
}
