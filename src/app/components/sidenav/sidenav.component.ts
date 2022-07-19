import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../MaterialModule';

@Component({
  standalone: true,
  imports: [MaterialModule],
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
