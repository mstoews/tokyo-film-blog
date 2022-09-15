import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { DndComponent } from '../../components/loaddnd/dnd.component';
import { MaterialModule } from '../../MaterialModule';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../icons.module';
import { MenubarComponent } from '../../components/menubar/menubar.component';

import { getAnalytics } from '@angular/fire/analytics';

// import { persistenceEnabled as _persistenceEnabled } from '../../app.component';
import { traceUntilFirst } from '@angular/fire/performance';
import { doc, docData, Firestore } from '@angular/fire/firestore';

import { getAuth, Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';


@Component({
  standalone: true,
  imports: [RouterModule, GalleryComponent, DndComponent, MaterialModule, CommonModule, IconsModule],
  selector: 'landing-page',
  templateUrl: './landing-page2.component.html',
  providers: [ GoogleAuthProvider
  ],
})
export class LandingPage2Component implements OnInit {

  public testDocValue$: Observable<any> | undefined;
  // public readonly persistenceEnabled = _persistenceEnabled;

  constructor(
    private  router: Router,
    private matDialog: MatDialog,
    private firestore: Firestore,
    ) {}

  ngOnInit(): void {
  }
  onProducts() {
    console.log('Products');
    this.router.navigate(['products']);
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

  login() {
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    //this.auth.signOut();
  }

  getData() {
     const ref = doc(this.firestore, 'test/1');
     this.testDocValue$ = docData(ref).pipe(
       traceUntilFirst('firestore')
     );
  }

}
