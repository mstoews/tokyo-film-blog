import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutSession } from 'app/5.models/checkout';
import { filter, first } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare const Stripe: any;

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private jwtAuth: string | null;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    afAuth.idToken.subscribe((jwt) => (this.jwtAuth = jwt));
  }

  startPaymentIntent(cartId: any): Observable<CheckoutSession> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.jwtAuth as string
    );
    if (environment.production === false) {
      return this.http.post<CheckoutSession>(
        environment.api.baseUrl + '/api/payment-intent',
        {
          cartId,
          callbackUrl: this.buildCallbackUrl(),
        },
        { headers }
      );
    } else {
      return this.http.post<CheckoutSession>(
        environment.api.prdUrl + '/api/payment-intent',
        {
          cartId,
          callbackUrl: this.buildCallbackUrl(),
        },
        { headers }
      );
    }
  }

  startProductCheckoutSession(cartId: any): Observable<CheckoutSession> {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.jwtAuth as string
    );

    if (environment.production === false) {
      return this.http.post<CheckoutSession>(
        environment.api.baseUrl + '/api/checkout',
        {
          cartId,
          callbackUrl: this.buildCallbackUrl(),
        },
        { headers }
      );
    } else {
      return this.http.post<CheckoutSession>(
        environment.api.prdUrl + '/api/checkout',
        {
          cartId,
          callbackUrl: this.buildCallbackUrl(),
        },
        { headers }
      );
    }
  }

  buildCallbackUrl() {
    const protocol = window.location.protocol,
      hostName = window.location.hostname,
      port = window.location.port;

    let callBackUrl = `${protocol}//${hostName}`;

    if (port) {
      callBackUrl += ':' + port;
    }

    callBackUrl += '/shop/purchase-thanks';

    return callBackUrl;
  }

  redirectToCheckout(session: CheckoutSession) {
    const stripe = Stripe(session.stripePublicKey);
    stripe.redirectToCheckout({
      sessionId: session.stripeCheckoutSessionId,
    });
  }

  waitForPurchaseCompleted(ongoingPurchaseSessionId: string): Observable<any> {
    return this.afs
      .doc<any>(`purchaseSessions/${ongoingPurchaseSessionId}`)
      .valueChanges()
      .pipe(
        filter((purchase) => purchase.status == 'completed'),
        first()
      );
  }
}
