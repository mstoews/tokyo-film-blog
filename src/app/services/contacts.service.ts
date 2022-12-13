import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'app/models/contact';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient){}

  updateContact(contact: Contact): Observable <any> {
    return this.http.post<any>(environment.api.createMessage, {
      name: contact.name,
      email: contact.email,
      message : contact.message,
      phone: contact.phone
    }).pipe(res => res);
  }
}
