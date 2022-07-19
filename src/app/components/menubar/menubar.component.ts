import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../MaterialModule';
import { IconsModule } from '../icons.module';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, IconsModule],
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  @Output() notifyParentRefresh: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentClone: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentAdd: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDelete: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentBackUp: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentRestore: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentSend: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentJsonDownload: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentJsonUpload: EventEmitter<any> = new EventEmitter();
  unreadCount = 1;

  @Input() public inTitle: string | undefined;
  @Input() public inPartyRef: string | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {}

  formPartyRefChanged(partyRef: string) {
    //  console.log ('From MenuBarcomponent: ', partyRef);
  }

  onDelete() {
    //  console.log ('Delete emitter is sent:', this.inPartyRef);
    this.notifyParentDelete.emit();
  }

  onRefresh() {
    //  console.log ('Refresh emitter is sent');
    this.notifyParentRefresh.emit();
  }

  onClickClone() {
    //  console.log ('Clone emitter is sent');
    this.notifyParentClone.emit();
  }

  onSend() {
    //  console.log ('Send emitter is sent');
    this.notifyParentSend.emit();
  }

  onBackUp() {
    //  console.log ('Back Up emitter is sent');
    this.notifyParentBackUp.emit();
  }

  onRestore() {
    //  console.log ('Restore emitter is sent');
    this.notifyParentRestore.emit();
  }

  onClickAdd() {
    //  console.log ('Add emitter is sent');
    this.notifyParentAdd.emit();
  }

  onClickRefresh() {
    this.onRefresh();
  }

  onClickDelete() {
    this.onDelete();
  }

  onClickSend() {
    this.onSend();

  }

  onClickBackUp() {
    this.onBackUp();
  }

  onClickRestore() {
    this.onRestore();
  }

  ngOnDestroy() {}
}
