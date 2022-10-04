import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

interface IValue {
  value: string;
  viewValue: string;
  menuDesc: string;
}

@Component({
  selector: 'grid-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class GridMenubarComponent implements OnInit {
  @Output() notifyParentAdd: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentRefresh: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDelete: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentClone: EventEmitter<any> = new EventEmitter();
  @Output() notifyMenuItemChanged: EventEmitter<any> = new EventEmitter();

  @Input() public inTitle: string;
  @Input() public inPartyRef: string;
  @Input() public selected: string;
  public partyReference$: any;
  public partyMenu$: any;
  public menuItems: IValue[];
  

  constructor() { }

  ngOnInit(): void {
  
  }

  // tslint:disable-next-line:variable-name
  onRefreshPartyRef(party_ref: string): void {
  
    this.onRefresh();
  }

  onRefresh(): void {
    this.notifyParentRefresh.emit();
  }

  onClickAdd(): void {
    this.notifyParentAdd.emit();
  }

  onClickDelete(): void {
    this.notifyParentDelete.emit();
  }

  onClickClone(): void {
    this.notifyParentClone.emit();
  }

  onClickRefresh(): void {
    this.onRefresh();
  }
}
