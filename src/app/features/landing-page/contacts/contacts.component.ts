import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Mainpage } from 'app/models/mainpage';
import { Observable } from 'rxjs';
import { MainPageService } from 'app/services/main-page.service';
import { Contact } from 'app/models/contact';
import { ContactService } from 'app/services/contact.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
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
      private mainPageService: MainPageService,
      private http: HttpClient
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
    this.contactService.create(contact);
    // console.log(JSON.stringify(contact));
    // this.http.post(environment.emulator.createMessage(contact) {

    // }.createMessage, {
    //   contact
    // })
    //   .pipe(
    //       catchError(err => {
    //           console.log(err);
    //           alert('Could not create message');
    //           return throwError(err);
    //       })
    //   ).subscribe(() => {
    //       alert("User created successfully!");
    //       this.contactGroup.reset();
    //   });
    this.contactGroup.reset();
  }


  scrollToId() {
    this.router.navigate(['home']);
  }

  createEmptyForm() {
    this.contactGroup = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      message: [''],
    });
  }

  createForm() {
    this.contactGroup = this.fb.group({
      name: [this.contact.name],
      email: [this.contact.email],
      phone: [this.contact.phone],
      message: [this.contact.message],
    });
  }
}
