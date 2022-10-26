import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { DndComponent } from '../../components/loaddnd/dnd.component';
import { ScrollService } from 'app/services/scroll.service';
import { animate, style, transition, trigger} from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: [
    '.scroll-to-top {position: fixed}'
  ],
  animations: [
    trigger(
      'inOutAnimation', [
        transition(
          ':enter', [
            style({opacity: 0}),
            animate('0.5s ease-out',
              style({opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({opacity: 1}),
            animate('0.5s ease-in',
              style({opacity: 0}))
          ]
        ),
      ]
    )
  ]
})
export class LandingPageComponent implements OnInit {

  titleMessage = "Beautifully Hand Crafted Products";

  public testDocValue$: Observable<any> | undefined;
  // public readonly persistenceEnabled = _persistenceEnabled;
  constructor(
    private  router: Router,
    private matDialog: MatDialog,
    private scrollTo: ScrollService,
    ) {}

  ngOnInit(): void {}

  onProducts() {
    console.log('Products');
    this.router.navigate(['products']);
  }

  scrollToId(id: string) {
      console.log("element id : ", id);
      this.scrollTo.scrollToElementById(id);
  }

  onEvent(){
    console.log('Event');
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //  console.log ('Just before update', result.data);
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          // private matDialog: MatDialog,this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
  }

}
