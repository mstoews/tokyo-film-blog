import { Component, OnInit, Output } from '@angular/core'

import { MatDialog } from '@angular/material/dialog'
import { Router, TitleStrategy, UrlHandlingStrategy } from '@angular/router'
import { DndComponent } from '../../components/loaddnd/dnd.component'
import { ScrollService } from 'app/services/scroll.service'
import { animate, style, transition, trigger } from '@angular/animations'
import { Observable } from 'rxjs'
import { ContactService } from 'app/services/contact.service'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Contact } from 'app/models/contact'
import { MainPageService } from 'app/services/main-page.service'
import { Mainpage } from 'app/models/mainpage'
import { ImageListService } from 'app/services/image-list.service'
import { imageItem } from 'app/models/imageItem'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: ['.scroll-to-top {position: fixed}'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LandingPageComponent implements OnInit {
  public topCollection: imageItem[] = [];
  public bottomCollection: imageItem[] = [];

  contactGroup: FormGroup;
  mainPage$: Observable<Mainpage[]>;
  featuredList$: Observable<imageItem[]>;
  mainPageDoc: Mainpage;
  titleMessage = '';
  features_image = './assets/images/tailoring.jpg';
  // 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2F161714D0-73C9-4C75-8D15-B8B2F08EE5E1_800x800.JPG?alt=media&token=b5401a57-c7cb-415d-b185-35d59b30a0c7'
  services_one = './assets/images/tailoring.jpg';
  // 'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Fcroppedforservicestailoring_400x400.JPG?alt=media&token=f5fcb885-70b8-4dfe-97ba-1db54699d7c1'
  services_two = './assets/images/knitting.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Fcroppedforservices_400x400.JPG?alt=media&token=78f54e83-17d4-4f8c-8eeb-1def74080f74'
  services_three = './assets/images/repairs.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Fcroppedforservicesmending_400x400.JPG?alt=media&token=20779c32-8bc3-4bc0-a9dd-86093ad5c061'
  services_four = './assets/images/bespoke_knitting.jpg';
  //'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/400%2Freadytowearcrop_400x400.JPEG?alt=media&token=ee82d3fa-82ed-402f-b364-17ec0024e3d8'
  about_us = './assets/images/about.jpg';
  //  'https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/800%2F213E0BF3-EF7F-4C0F-AF24-86EA01398C81_800x800.jpeg?alt=media&token=120537a4-229d-4594-a787-41ff5ec4b42b'

  constructor(
    private contactService: ContactService,
    private imageListService: ImageListService,
    private mainPage: MainPageService,
    private router: Router,
    private matDialog: MatDialog,
    private scrollTo: ScrollService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mainPage$ = this.mainPage.getAll();
    this.featuredList$ = this.imageListService.getImagesByType('IN_GALLERY');
    this.mainPage$.subscribe((doc) => {
      if (doc.length > 0) {
        this.mainPageDoc = doc[0];
        this.titleMessage = this.mainPageDoc.hero_title;
      } else {
        let document = {
          id: 1,
          hero_title: 'There should be something at the tope of the HERO',
          features_header: 'Header',
          features_subheader: 'Sub Title',
          cta_left: 'Left',
          cta_right: 'Right',
          contact_email: 'Joey',
          contact_telephone: '555-1212',
          contact_shipping: 'Shipping',
          active: true,
        };
        this.mainPageDoc = document;
        this.titleMessage = document.hero_title;
      }
    });
    this.createEmptyForm();
    this.populateImageList();
  }

  onServices(service: string) {
    // console.log(service);
    this.router.navigate([service]);
  }

  onUpdate(contact: Contact) {
    contact = this.contactGroup.getRawValue();
    this.contactService.create(contact);
    this.createEmptyForm();
  }

  createEmptyForm() {
    this.contactGroup = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      message: [''],
    });
  }

  onClickAboutUs() {
    // console.log('navigate to about us');
    this.router.navigate(['home/about_us']);
  }

  onContactUs() {
    // console.log('Products');
    this.router.navigate(['home/contacts']);
  }

  scrollToId(id: string) {
    // console.log('element id : ', id);
    this.scrollTo.scrollToElementById(id);
  }



  populateImageList() {
    let imageCount = 0;
    this.featuredList$ = this.imageListService.getImagesByType('IN_GALLERY');
    // featuredList.subscribe((img) => {
    //   img.forEach((image) => {
    //     if (imageCount < 3) {
    //       this.topCollection.push(image);
    //     } else {
    //       this.bottomCollection.push(image);
    //     }
    //     imageCount++;
    //   });
    // });
  }
}


