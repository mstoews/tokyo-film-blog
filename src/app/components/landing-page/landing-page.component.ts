import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';
import { DndComponent } from '../loaddnd/dnd.component';
import { MaterialModule } from '../../MaterialModule';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../icons.module';
import { MenubarComponent } from '../menubar/menubar.component';
import { BlogComponent } from '../blog/blog.component';

@Component({
  standalone: true,
  imports: [RouterModule, GalleryComponent, DndComponent, MaterialModule, CommonModule, IconsModule, MenubarComponent, BlogComponent],
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  providers: [ GoogleAuthProvider,
    //AngularFireAuth
  ],
})
export class LandingPageComponent implements OnInit {

  constructor(
    private  router: Router,
    private matDialog: MatDialog,
    //public auth: AngularFireAuth,
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

}
