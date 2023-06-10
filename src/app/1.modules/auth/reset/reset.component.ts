import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod' ;


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  isPasswordResetCodeSent: boolean = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}



  onSendPasswordResetCode(resetForm: NgForm) {
    this.httpClient
      .post( `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebase.apiKey}`,
        { ...resetForm.value, requestType: 'PASSWORD_RESET' }
      )
      .subscribe(
        () => {
          this.snackBar.open('Email Sent.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-success',
            duration: 3000,
          });
          this.isPasswordResetCodeSent = true;
          this.router.navigate(['auth/login']);
        },
        (error) => {
          let errorMessage = 'Operation Failed - ' + error.error.error.message;

          this.snackBar.open(errorMessage, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-danger',
            duration: 3000,
          });
        }
      );
  }
}
