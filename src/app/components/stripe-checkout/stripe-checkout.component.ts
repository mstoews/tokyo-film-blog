import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent, NgxStripeModule } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { MaterialModule } from 'app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'stripe-checkout',
  templateUrl: 'stripe-checkout.component.html',
  imports: [CommonModule, MaterialModule, NgxStripeModule],

})
export class StripeCheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#0b120c',
        color: '#31325F',
       
        fontWeight: '300',
        fontFamily: '"Helvetica", Helvetica, sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#0b120c'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}