import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { CartService } from 'app/services/cart.service';
import { CheckoutService } from 'app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartId: string;
  purchaseStarted: boolean = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private snack: MatSnackBar
  ){}

  onCheckOut() {
    // if (this.admin_login === true) {
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
    // } else {
    //   this.route.navigate(['/shop/coming-soon']);
    // }
  }

  // Dropdown 1
button1 = document.getElementById("button1");
menu = document.getElementById("menu");
closeIcon = document.getElementById("close");
openIcon = document.getElementById("open");
// showMenu1 = (flag) => {
//   if (flag) {
//     menu.classList.toggle("hidden");
//     closeIcon.classList.toggle("hidden");
//     openIcon.classList.toggle("hidden");
//   }
// };
// const changeButton1 = (text) => {
//   button1.innerHTML = text;
//   menu.classList.toggle("hidden");
//   closeIcon.classList.toggle("hidden");
//   openIcon.classList.toggle("hidden");
// };

// // Dropdown 2
// let button2 = document.getElementById("button2");
// let menu2 = document.getElementById("menu2");
// let closeIcon2 = document.getElementById("close2");
// let openIcon2 = document.getElementById("open2");
// const showMenu2 = (flag) => {
//   if (flag) {
//     menu2.classList.toggle("hidden");
//     closeIcon2.classList.toggle("hidden");
//     openIcon2.classList.toggle("hidden");
//   }
// };
// const changeButton2 = (text) => {
//   button2.innerHTML = text;
//   menu2.classList.toggle("hidden");
//   closeIcon2.classList.toggle("hidden");
//   openIcon2.classList.toggle("hidden");
// };

// // Dropdown 3
// let button3 = document.getElementById("button3");
// let menu3 = document.getElementById("menu3");
// let closeIcon3 = document.getElementById("close3");
// let openIcon3 = document.getElementById("open3");
// const showMenu3 = (flag) => {
//   if (flag) {
//     menu3.classList.toggle("hidden");
//     closeIcon3.classList.toggle("hidden");
//     openIcon3.classList.toggle("hidden");
//   }
// };
// const changeButton3 = (text) => {
//   button3.innerHTML = text;
//   menu3.classList.toggle("hidden");
//   closeIcon3.classList.toggle("hidden");
//   openIcon3.classList.toggle("hidden");
// };
// // Dropdown 4
// let button4 = document.getElementById("button4");
// let menu4 = document.getElementById("menu4");
// let closeIcon4 = document.getElementById("close4");
// let openIcon4 = document.getElementById("open4");
// const showMenu4 = (flag) => {
//   if (flag) {
//     menu4.classList.toggle("hidden");
//     closeIcon4.classList.toggle("hidden");
//     openIcon4.classList.toggle("hidden");
//   }
// };
// const changeButton4 = (text) => {
//   button4.innerHTML = text;
//   menu4.classList.toggle("hidden");
//   closeIcon4.classList.toggle("hidden");
//   openIcon4.classList.toggle("hidden");
// };
// // Dropdown 5
// let button5 = document.getElementById("button5");
// let menu5 = document.getElementById("menu5");
// let closeIcon5 = document.getElementById("close5");
// let openIcon5 = document.getElementById("open5");
// const showMenu5 = (flag) => {
//   if (flag) {
//     menu5.classList.toggle("hidden");
//     closeIcon5.classList.toggle("hidden");
//     openIcon5.classList.toggle("hidden");
//   }
// };
// const changeButton5 = (text) => {
//   button5.innerHTML = text;
//   menu5.classList.toggle("hidden");
//   closeIcon5.classList.toggle("hidden");
//   openIcon5.classList.toggle("hidden");
// };


}
