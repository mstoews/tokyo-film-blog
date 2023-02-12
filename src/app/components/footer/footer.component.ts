import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment.prod';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-4.html',
})
export class FooterComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient) { }

  login(loginForm: NgForm, submit) {

   
    let email = loginForm.value.email;
    console.log(email);
    

    this.http.post<any>(environment.api.createMessage, {
      name: 'from Footer',
      email: email,
      message: 'reply with information and updates'

    }).pipe(catchError(err => {
      console.log('Error ', err);
      this._snackBar.open(JSON.stringify(err), 'Not Sent', {
        duration: 3000
      });
      return throwError(err);
    }))
      .subscribe((response: any) => {
        this._snackBar.open(JSON.stringify(response.message), 'OK', {
          duration: 3000
        });
        // this.contactGroup.reset();
      });
  }

  ngOnInit(): void {
  }

}
