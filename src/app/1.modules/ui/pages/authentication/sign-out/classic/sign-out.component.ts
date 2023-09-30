import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'sign-out-classic',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
  
})
export class SignOutClassicComponent implements OnInit{
  countdown: number = 5;
  countdownMapping: any = { '=1': '# second', other: '# seconds' };
  auth = inject(AngularFireAuth);
  /**
   * Constructor
   */
  constructor(private _router: Router) {}
  ngOnInit(): void {
    this.auth.signOut();
  }
}
