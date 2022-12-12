import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IconsModule } from 'app/icons.module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconsModule, MatIconModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private _location: Location) {
    this.title = "Add Title as Parameter in the Template"
  }

  @Input() title : string;
  @Input() sub_title : string;

  public onBack(){
    this._location.back()
  }

}
