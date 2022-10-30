import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { KanbanService } from '../../module/kanban.service';
import { StatusType } from './status.types';

@Component({
  selector: 'status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss'],
})
export class StatusListComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  statuses!: Observable<StatusType[]>;
  @Output() private statusChange: EventEmitter<any> =
    new EventEmitter<StatusType>();

  public status = {
    description: 'Some Description',
    status: 'OPEN',
    updatedte: '',
    updateusr: 'ADMIN',
  };

  cols: any;
  showFiller = false;
  formGroup: FormGroup;

  constructor(private kanbanService: KanbanService, private fb: FormBuilder) {
    this.statuses = this.kanbanService.getKanbanStatus();
    this.cols = this.kanbanService.getStatusCols();
    this.createForm();
  }

  public onNotify(status: any) {
    this.status = status;
    console.log('status opening', this.status);

    this.toggleDrawer(status);
  }

  createForm() {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];

    let status = {
      description: 'Some Description',
      status: 'OPEN',
      updatedte: updateDate,
      updateusr: 'ADMIN',
    };

    this.status = status;
    this.formGroup = this.fb.group({
      status: [this.status.status],
      description: [this.status.description],
      updatedte: [this.status.updatedte],
      updateusr: [this.status.updateusr],
    });
    console.log('On create');
  }

  public toggleDrawer(status: any) {
    console.log('toggleDrawer', status);
    this.status = status;
    this.formGroup = this.fb.group({
      status: [this.status.status],
      description: [this.status.description],
      updatedte: [this.status.updatedte],
      updateusr: [this.status.updateusr],
    });
    this.drawer.toggle();
  }

  onCloseDrawer() {
    this.drawer.toggle();
  }
  onUpdate() {
    const data = this.formGroup.getRawValue();
    console.log('onUpdate', data);
    this.drawer.toggle();
  }
}
