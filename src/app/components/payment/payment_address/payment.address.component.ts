import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from 'app/models/profile';
import { catchError, first, map, Observable, throwError } from 'rxjs';
import { MaterialModule } from 'app/material.module';
import { ProfileService } from 'app/services/profile.service';
import { AuthService } from 'app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UserService } from 'app/services/auth/user.service';

import {
  StripeService,
  StripePaymentElementComponent,
  NgxStripeModule,
} from 'ngx-stripe';
import { StripeElementsOptions, PaymentIntent } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './payment.address.component.html',
  imports: [MaterialModule, CommonModule, NgxStripeModule],
})
export class PaymentAddressComponent implements OnInit {
  profile: ProfileModel;
  profile$: Observable<ProfileModel[]>;
  formGroup: FormGroup;
  profileExists: boolean;
  private profileCollection: AngularFirestoreCollection<ProfileModel>;
  private profileItems: Observable<ProfileModel[]>;

  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  validated = false;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;

  updateBtnState: boolean = false;
  userId: string;
  email: string;
  profileId: string;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public afs: AngularFirestore,
    public profileService: ProfileService,
    public snackBar: MatSnackBar,
    private stripeService: StripeService,
    private http: HttpClient
  ) {
    this.profileCollection = afs.collection<ProfileModel>(
      `users/${this.authService.userId}/profile`
    );
    this.profileItems = this.profileCollection.valueChanges({ idField: 'id' });

    const theDate = new Date();
    const address: ProfileModel = {
      id: '',
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      province_state: '',
      postal_code: '',
      phone_number: '',
      country: '',
      created_date: theDate.toDateString(),
      userId: this.userId,
    };
    this.createForm(address);
    this.updateBtnState = false;
  }

  ngOnInit() {
    this.profileExists = false;
    this.authService.afAuth.authState.subscribe((user) => {
      this.userId = user?.uid;
      this.email = user?.email;

      let collection = this.afs.collection<ProfileModel>(
        `users/${this.userId}/profile`
      );
      const profiles = collection.valueChanges({ idField: 'id' });

      console.debug('ngOnInit', this.userId);

      // return only the first element of document which constains the only profile for the user ID if it exists.

      profiles.pipe(first()).subscribe((ref) => {
        if (ref.length > 0) {
          this.profileExists = true;
          // console.log('The profile exists for this user!');
          ref.forEach((mr) => {
            this.profileId = mr.id;
            this.createForm(mr);
          });
        }
      });
    });
    // this.CreateIntent();
  }

  onUpdateProfile() {
    let data = this.formGroup.getRawValue();
    this.updateBtnState = true;

    if (this.profileExists === false) {
      this.authService.afAuth.currentUser
        .then((user) => {
          //const collectionRef = this.afs.collection(`users/${user.uid}/profile/`);
          this.profileCollection
            .add(data)
            .then((newProfile) => {
              data.id = newProfile.id;
              this.profileCollection.doc(data.id).update(data);
            })
            .catch()
            .finally();
          this.snackBar.open('Profile has been add ...', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          console.log('user doc', this.updateStripeCustomerId(user.uid));
        })
        .then()
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    } else {
      this.authService.afAuth.currentUser
        .then((user) => {
          const collectionRef = this.afs.collection(
            `users/${user.uid}/profile/`
          );
          data.id = this.profileId;
          collectionRef.doc(this.profileId).update(data);
          this.snackBar.open('Profile has been updated ...', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.updateStripeCustomerId(user.uid);
          console.log('user doc', this.updateStripeCustomerId(user.uid));
        })
        .then(() => {
          // console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
    this.updateBtnState = false;
  }

  updateStripeCustomerId(userId: string) {
    this.afs
      .collection(`/users/{$userId}/stripe`)
      .get()
      .pipe(
        map((result) => {
          return result.docs.map((snap) => {
            return {
              id: snap.id,
              ...(<any>snap.data()),
            };
          });
        })
      );
  }

  createForm(profile: ProfileModel) {
    const theDate = new Date();
    this.formGroup = this.fb.group({
      email: [profile.email, Validators.required],
      first_name: [profile.first_name, Validators.required],
      last_name: [profile.last_name, Validators.required],
      middle_name: [profile.middle_name],
      address_line1: [profile.address_line1, Validators.required],
      address_line2: [profile.address_line2, Validators.required],
      city: [profile.city, Validators.required],
      province_state: [profile.province_state, Validators.required],
      postal_code: [profile.postal_code, Validators.required],
      country: [profile.country, Validators.required],
      phone_number: [profile.phone_number, Validators.required],
      created_date: theDate.toDateString(),
      userId: this.userId,
    });
  }

  onMakePayment() {
    console.log('Card ', this.paymentElement.elements.getElement('card'));

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
  }

  CreateIntent() {
    this.createPaymentIntent(this.formGroup.get('amount').value)
      .pipe(
        catchError((err) => {
          console.debug('Error ', err);
          this.snackBar.open(JSON.stringify(err), 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          return throwError(() => new Error('Error creating payment intent'));
        })
      )
      .subscribe((response: any) => {
        console.log('Response', response);
        this.validated = true;
        this.elementsOptions.clientSecret = response.client_secret;
        this.snackBar.open(JSON.stringify(response.message), 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    console.log('email', this.formGroup.get('email').value);

    return this.http.post<PaymentIntent>(environment.dev.paymentIntent, {
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      name: this.formGroup.get('name').value,
      receipt_email: this.formGroup.get('email').value,
    });
  }
}
