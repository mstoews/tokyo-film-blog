import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SideNavComponent implements OnInit {

  @Output() notifyParentCloseDrawer: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.notifyParentCloseDrawer.emit();
  }

}

