import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MaterialModule } from '../MaterialModule';
import { MenubarComponent } from '../menubar/menubar.component';
import { IconsModule } from '../icons.module';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  standalone: true,
  imports: [RouterModule, MaterialModule, MenubarComponent, IconsModule, SidenavComponent],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})

export class AdminComponent implements OnInit {

  profileUrl: Observable<string | null> | undefined;
  constructor(private storage: AngularFireStorage) {
    const ref = this.storage.ref('landing/cassie_wool_1.jpg');
    this.profileUrl = ref.getDownloadURL();
  }

  ngOnInit(): void {

  }

}
