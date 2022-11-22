import {
  Component,
  OnInit,
  Output,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DndComponent } from '../../components/loaddnd/dnd.component';
import { ScrollService } from 'app/services/scroll.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { ContactService } from 'app/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'app/models/contact';
import { MainPageService } from 'app/services/main-page.service';
import { Mainpage } from 'app/models/mainpage';
import { ImageListService } from 'app/services/image-list.service';
import { imageItem } from 'app/models/imageItem';

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

  @Output() public topCollection: imageItem[] = [];
  @Output() public bottomCollection: imageItem[] = [];

  contactGroup: FormGroup;
  mainPage$: Observable<Mainpage[]>;
  featuredList$: Observable<imageItem[]>;
  mainPageDoc: Mainpage;
  titleMessage = '';

  constructor(
    private contactService: ContactService,
    private imageListService: ImageListService,
    private mainPage: MainPageService,
    private router: Router,
    private matDialog: MatDialog,
    private scrollTo: ScrollService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.mainPage$ = this.mainPage.getAll();
    this.featuredList$ = this.imageListService.getImagesByType('IN_GALLERY');
    this.mainPage$.subscribe(doc => {
      if (doc.length > 0 ){
        this.mainPageDoc = doc[0];
        this.titleMessage = this.mainPageDoc.hero_title;
      }
    });
    this.createEmptyForm();
    this.populateImageList();
  }

  onServices(service: string) {
      console.log(service);
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

  onProducts() {
    console.log('Products');
    this.router.navigate(['products']);
  }

  scrollToId(id: string) {
    console.log('element id : ', id);
    this.scrollTo.scrollToElementById(id);
  }

  onEvent() {
    console.log('Event');
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          // private matDialog: MatDialog,this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
  }

  populateImageList() {
    var imageCount = 0;
    const featuredList = this.imageListService.getImagesByType('IN_GALLERY');
    featuredList.subscribe((img) => {
        img.forEach((image) => {
          if (imageCount < 3) {
            this.topCollection.push(image)

          }
          else {
            this.bottomCollection.push(image)
          }
          imageCount++;
        });
    });
  }
}

/*
LEADER IN HAND MADE KNITTED PRODUCTS
Founded in 2018, Made-to has been producing world-class hand knitted products for over a decade.
Latest images and our narrative concerning the latest in world of knitting.
Contact Made-To directly for one of a kind patterns.
*/
