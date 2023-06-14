import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { HttpClient } from '@angular/common/http';

import {
  StripeService,
  StripePaymentElementComponent,
  NgxStripeModule,
} from 'ngx-stripe';
import { StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { MaterialModule } from 'app/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressComponent } from 'app/1.modules/pages/profile/address/address.component';

@Component({
  standalone: true,
  selector: 'payment-intent',
  templateUrl: './payment.component.html',
  imports: [CommonModule, MaterialModule, NgxStripeModule, AddressComponent],
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  validated = false;

  paymentElementForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: [''],
    postal_code: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.CreateIntent();
  }

  CreateIntent() {
    this.createPaymentIntent(this.paymentElementForm.get('amount').value)
      .pipe(
        catchError((err) => {
          console.debug('Error ', err);
          this._snackBar.open(JSON.stringify(err), 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return throwError(() => new Error('Error creating payment intent'));
        })
      )
      .subscribe((response: any) => {
        //console.log('Response', response);
        this.validated = true;
        this.elementsOptions.clientSecret = response.client_secret;
        this._snackBar.open(JSON.stringify(response.message), 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  // const handleSubmit = async (event) => {
  pay() {
    // console.log('Card ', this.paymentElement.elements.getElement('card'));

    this.stripeService
      .confirmCardPayment(this.elementsOptions.clientSecret, {
        payment_method: 'pm_card_visa',
      })
      .subscribe((result) => {
        this.paying = false;
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            const reply = { success: true, message: 'Payment succeeded!' };
            alert(JSON.stringify(reply));
          }
        }
      });

    // console.log('confirm payment', this.elementsOptions.clientSecret );
    // if (this.paymentElementForm.valid) {
    //   this.paying = true;

    //   console.log('confirm payment', this.paymentElement);
    //   this.stripeService.confirmPayment( {
    //     elements: this.paymentElement.elements,
    //     confirmParams: {
    //       payment_method_data: {
    //         billing_details: {
    //           name: this.paymentElementForm.get('name').value,
    //           email: this.paymentElementForm.get('email').value,
    //           address: {
    //             line1: this.paymentElementForm.get('address').value || '',
    //             postal_code: this.paymentElementForm.get('postal_code').value || '',
    //             city: this.paymentElementForm.get('city').value || '',
    //           }
    //         }
    //       }
    //     },
    //     redirect: 'if_required'
    //   }).subscribe(result => {
    //     this.paying = false;
    //     console.log('Result', result);
    //     if (result.error) {
    //       // Show error to your customer (e.g., insufficient funds)
    //       alert({ success: false, error: result.error.message });
    //     } else {
    //       // The payment has been processed!
    //       if (result.paymentIntent.status === 'succeeded') {
    //         // Show a success message to your customer
    //         alert({ success: true });
    //       }
    //     }
    //   });
    // } else {
    //   console.log(this.paymentElementForm);
    // }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    console.log('email', this.paymentElementForm.get('email').value);

    return this.http.post<PaymentIntent>(environment.dev.paymentIntent, {
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      name: this.paymentElementForm.get('name').value,
      receipt_email: this.paymentElementForm.get('email').value,
    });
  }
}
