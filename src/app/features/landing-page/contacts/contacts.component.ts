import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mainpage } from 'app/models/mainpage';
import { Observable } from 'rxjs';
import { MainPageService } from 'app/services/main-page.service';
import { Contact } from 'app/models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/dev';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sendEmailVerification } from 'firebase/auth';
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
      private mainPageService: MainPageService,
      private _snackBar: MatSnackBar,
      private http: HttpClient,
      private contactService: ContactService
      )
  {
    this.createForm();
  }

  ngOnInit(): void {
    this.mainPage$ = this.mainPageService.getAll();
    this.mainPage$.subscribe(doc => {
      if (doc.length > 0 ){
        this.mainPageDoc = doc[0];
      }
    });
  }

  onSubmit() {
    // console.log(JSON.stringify(this.contactGroup.value));
    this.onUpdate(this.contactGroup.value)
  }

  onUpdate(contact: Contact) {

    // this.contactService.create(contact);
    // this.contactGroup.reset();
    // this._snackBar.open('Connect message has been received, thank you', 'OK', {
    //           duration: 2000
    //         });

    this.http.post<any>(environment.api.createMessage, {
      name: contact.name,
      email: contact.email,
      message : contact.message,

    }).subscribe((response: any) => {
          this._snackBar.open(response.message, 'OK', {
            duration: 2000
          });
          this.contactGroup.reset();
    });
  }

  scrollToId() {
    this.router.navigate(['home']);
  }

  createForm() {
    this.contactGroup = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(4)]
      ],
      email: ['',
        [Validators.required,
        Validators.email]
      ],
      message: ['',
        [Validators.required,
          Validators.minLength(15),
          Validators.maxLength(100) ]
      ],
    });
  }

}
