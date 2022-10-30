import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  constructor() {}

  ngOnInit(): void {}

  onTabClick() {
    let index = this.tabGroup.selectedIndex;
    if (index === null) {
      index = 0;
    }

    }
  }
