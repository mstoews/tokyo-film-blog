import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/4.services/auth/auth.service';
import { CartService } from 'app/4.services/cart.service';
import { CheckoutService } from 'app/4.services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  cartId: string;
  purchaseStarted: boolean = false;

  profileGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private snack: MatSnackBar,
    private fb: FormBuilder
  ) {}

  onSubmit() {}

  onCheckOut() {
    if (this.cartId !== undefined) {
      this.purchaseStarted = true;
      this.checkoutService
        .startProductCheckoutSession(this.cartId)
        .subscribe((checkoutSession) => {
          this.checkoutService.redirectToCheckout(checkoutSession);
        });
      this.purchaseStarted = false;
    } else {
      alert('Try again in one moment or refresh the screen');
      this.purchaseStarted = false;
    }
  }
}
