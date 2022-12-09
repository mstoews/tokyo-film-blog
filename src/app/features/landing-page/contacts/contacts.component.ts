import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Mainpage } from 'app/models/mainpage';
import { Observable } from 'rxjs';
import { MainPageService } from 'app/services/main-page.service';
import { Contact } from 'app/models/contact';
import { ContactService } from 'app/services/contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactGroup: FormGroup;
  mainPage$: Observable<Mainpage[]>;
  mainPageDoc: Mainpage;

  contact: Contact;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private contactService: ContactService,
      private mainPageService: MainPageService
      )
  {
    this.createEmptyForm();
  }

  ngOnInit(): void {
    this.mainPage$ = this.mainPageService.getAll();
    this.mainPage$.subscribe(doc => {
      if (doc.length > 0 ){
        this.mainPageDoc = doc[0];
      }
    });
  }

  onUpdate(contact: Contact) {
    // contact = this.contactGroup.getRawValue();
    this.contactService.create(contact);
    this.createEmptyForm();
  }

  onSend(contact: Contact) {
    contact = this.contactGroup.getRawValue();
    this.contactService.create(contact);
    this.createEmptyForm();
  }

  scrollToId() {
    this.router.navigate(['home']);
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

  createForm() {
    this.contactGroup = this.fb.group({
      id: [this.contact.id],
      name: [this.contact.name],
      email: [this.contact.email],
      phone: [this.contact.phone],
      message: [this.contact.message],
    });
  }
}
