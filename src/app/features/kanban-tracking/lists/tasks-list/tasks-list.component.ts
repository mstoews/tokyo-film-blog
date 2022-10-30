import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { KanbanService } from '../../module/kanban.service';
import { KanbanRefService } from '../../module/kanban-party-ref.service';
import { ITask } from '../interface.types';
import { MatDrawer } from '@angular/material/sidenav';
import { SnackService } from '../../../../services/snack.service';

export type Query = {
  KanbanTaskByRef: ITask[];
};
@Component({
  selector: 'tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  selectedTask: ITask;
  tasks!: Observable<ITask[]>;
  drawOpen: 'open' | 'close' = 'open';
  @ViewChild('drawer') drawer: MatDrawer;

  @Input() public partyType = 'COMP';
  @Input() public partyRef = 'JPTC';
  cols: any;

  constructor(
    public dialog: MatDialog,
    public kanbanService: KanbanService,
    public kanbanRefService: KanbanRefService,
    public partySnackMessage: SnackService
  ) {
    kanbanRefService.kanbanRefUpdated.subscribe((kanban) => {
      this.partyRef = kanban.partyRef;
      this.refreshDataByRef(this.partyRef);
    });
  }

  toggleDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      if (this.drawOpen === 'close') {
        this.drawer.toggle();
      }
    }
    this.refreshData();
  }



  ngOnInit() {
    this.tasks = this.kanbanService.getKanbanTaskByRef(this.partyRef);
    this.cols = this.kanbanService.getTaskCols();
  }

  public refreshData() {
    this.tasks = this.kanbanService.getKanbanTaskByRef(this.partyRef);
  }

  public refreshDataByRef(partyRef: string) {
    this.tasks = this.kanbanService.getKanbanTaskByRef(partyRef);
  }

  selectTask(e) {
    e.component.byKey(e.currentSelectedRowKeys[0]).done((task) => {
      if (task) {
        this.selectedTask = task;
      }
    });
  }

  onNotify(data){
    this.toggleDrawer();
  }

  onRowDblClick(e) {
    this.toggleDrawer();
  }

  create(data) {
    this.kanbanService.KanbanCreate(data);
    this.toggleDrawer();
  }

  update(data) {
    this.kanbanService.kanbanUpdate(data.task_id, data);
    this.toggleDrawer();
  }

  delete(data) {
    this.kanbanService.kanbanDelete(data.task_id);
    this.toggleDrawer();
  }
}
