import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanService } from '../../module/kanban.service';
import { IAssignee } from '../../module/tasks.model';

export interface ITeam {
  userid: string;
  client_ref: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string
}

@Component({
  selector: 'team-list',
  template: `
    <ng-container *ngIf="team$ | async as team">
      <grid
        [cols]="cols"
        [rows]="team"
        (notifyOpenDialog)="onNotify($event)"
      >
      </grid>
    </ng-container>
  `,
})
export class TeamListComponent {
  team$: Observable<any[]>;
  cols: any;

  constructor(private kanbanService: KanbanService) {
    this.team$ = this.kanbanService.users();
    this.cols = this.kanbanService.getTeamCols();
  }
}
