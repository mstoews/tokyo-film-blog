import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IconsModule } from 'app/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconsModule, MatIconModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (
    private _location: Location,
    private _router: Router
    ) {
    this.title = "Add Title as Parameter in the Template"
  }

  @Input() title : string;
  @Input() sub_title : string;
  @Input() back: boolean;
  @Input() home: boolean;

  public onBack(){
    this._location.back()
  }

  public onHome(){
    this._router.navigate(['home']);
  }


}
