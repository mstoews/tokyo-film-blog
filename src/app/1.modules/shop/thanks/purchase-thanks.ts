import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'app/4.services/auth/auth.service';
import { CartService } from 'app/4.services/cart.service';

@Component({
  selector: 'purchase-thanks',
  templateUrl: './purchase-thanks.html',
  styleUrls: ['./purchase-thanks.css']
})
export class PurchaseThanksComponent {
  userId: string;
  constructor(
    private authService: AuthService,
    private route: Router ) {

      this.authService.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          this.userId = userId;
          console.log('user id', userId);
          const  url = new URL(window.location.href);
          console.log(url.searchParams.get('purchaseResult'));
          if (url.searchParams.get('purchaseResult') === 'failed') {
            this.backToCart(this.userId);
          }
        }
      });
  }

  backToShop() {
    this.route.navigate(['shop']);
  }

  backToCart(userId: string) {
    console.log('back to cart', userId);
    this.route.navigate(['shop/cart', userId]);
  }
}
