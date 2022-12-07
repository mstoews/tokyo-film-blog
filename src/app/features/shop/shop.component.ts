import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ]),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
        ])
      ])
    ])
   ],
})
export class ShopComponent implements OnInit {

  constructor() { }
  ngOnInit(): void { }

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
