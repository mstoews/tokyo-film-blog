import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'app/4.services/scroll.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { ContactService } from 'app/4.services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'app/5.models/contact';
import { MainPageService } from 'app/4.services/main-page.service';
import { Mainpage } from 'app/5.models/mainpage';
import { imageItem } from 'app/5.models/imageItem';
import { AuthService } from 'app/4.services/auth/auth.service';
import { BlogService } from '../../4.services/blog.service';
import { MenuToggleService } from '../../4.services/menu-toggle.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

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
  mainPageDoc: Mainpage;
  titleMessage = '';
  features_image = './assets/images/tailoring.jpg';
  services_one = './assets/images/tailoring.jpg';
  services_two = './assets/images/knitting.jpg';
  services_three = './assets/images/repairs.jpg';
  services_four = './assets/images/bespoke_knitting.jpg';
  about_us = './assets/images/about.jpg';

  constructor(
    private contactService: ContactService,
    private mainPage: MainPageService,
    private router: Router,
    private scrollTo: ScrollService,
    private fb: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService,
    private menuToggle: MenuToggleService
  ) {}

  imageListService = inject(ImageItemIndexService);

  mainPage$ = this.mainPage.getAll();
  featuredList$ = this.imageListService.getAllImages('IN_GALLERY');

  ngOnInit(): void {
    this.createEmptyForm();
  }

  @Output() notifyNavBarToggleMenu: EventEmitter<any> = new EventEmitter();

  onMenuToggle() {
    this.menuToggle.setDrawerState(true);
    this.notifyNavBarToggleMenu.emit();
  }

  onLastestBlog() {
    this.blogService.getAllPublishedBlog().subscribe((blog) => {
      if (blog.length > 0) {
        this.router.navigate(['blog/detail', blog[0].id]);
        return;
      } else {
        this.router.navigate(['blog']);
      }
    });
  }

  onService() {
    this.router.navigate(['home/services']);
  }

  onFollowing() {
    this.router.navigate(['home/following']);
  }

  onServices(service: string) {
    // console.debug(service);
    this.router.navigate([service]);
  }

  onAboutUs(service: string) {
    // console.debug(service);
    this.onClickAboutUs();
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
    this.router.navigate(['home/about_us']);
  }

  onContactUs() {
    this.router.navigate(['home/contacts']);
  }

  scrollToId(id: string) {
    this.scrollTo.scrollToElementById(id);
  }

  onFeatured() {
    this.router.navigate(['collections']);
  }

  populateImageList() {
    let imageCount = 0;
    this.featuredList$ = this.imageListService.getAllImages('IN_GAllERY');
  }
}
