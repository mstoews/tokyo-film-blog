import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onTabClick() {
    let index = this.tabGroup.selectedIndex;
    if (index === null)
    {
      index = 0;
    }

    const tabLabel = this.tabGroup._tabs.toArray()[index].textLabel;
    {
      switch (tabLabel) {
        case 'Boards': {
          break;
        }
        case 'Kanban': {
          break;
        }
        case 'Board Tasks': {
          break;
        }
        case 'Dependency': {
          break;
        }
        case 'Priority': {
          break;
        }
        case 'Status': {
          break;
        }
        case 'Type': {
          break;
        }
        default:
          break;
      }
    }
  }


}
