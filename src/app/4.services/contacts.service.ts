import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'app/5.models/contact';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  updateContact(contact: Contact): Observable<any> {
    return this.http
      .post<any>(environment.api.createMessage, {
        name: contact.name,
        email: contact.email,
        message: contact.message,
      })
      .pipe((res) => res);
  }
}
