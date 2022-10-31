import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { DndComponent } from '../../components/loaddnd/dnd.component';
import { ScrollService } from 'app/services/scroll.service';
import { animate, style, transition, trigger} from '@angular/animations';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem } from 'app/models/imageItem';

const CUT_OFF = 4

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

  @Output() public topCollection: imageItem[] = [];
  @Output() public bottomCollection: imageItem[] = [];

  titleMessage = "Beautifully Hand Crafted Products";

  public testDocValue$: Observable<any> | undefined;
  // public readonly persistenceEnabled = _persistenceEnabled;
  constructor(
    private storage: AngularFireStorage,
    private  router: Router,
    private matDialog: MatDialog,
    private scrollTo: ScrollService,
    ) {}

  ngOnInit(): void {
    this.ImagesList();

  }

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
  ImagesList() {
    var imageCount = 0;
    this.storage
      .ref('/uploaded')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((downloadURL) => {
              imageCount++;
              const imageUrl = downloadURL;
              const imageData: imageItem = {

                caption: 'caption',
                type: 'GALLERY',
                imageSrc: imageUrl,
                imageAlt: imageCount.toString(),
              };
              if(imageCount < CUT_OFF)
                this.bottomCollection.push(imageData);
              if (imageCount > CUT_OFF)
                this.topCollection.push(imageData);
            });
        });
      });
  }

  randomIntFromInterval(min: number, max:number ) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
