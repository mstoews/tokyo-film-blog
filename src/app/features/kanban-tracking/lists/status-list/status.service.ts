/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import * as glossApi from 'app/services/api.service';
import { StatusType } from './status.types';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private _status: BehaviorSubject<StatusType | null> = new BehaviorSubject(
    null
  );
  private _statuses: BehaviorSubject<StatusType[] | null> = new BehaviorSubject(
    null
  );

  constructor(
    // Kanban Status
    private readonly kanbanStatus: glossApi.KanbanStatusGQL,
    private readonly kanbanStatusByIdGQL: glossApi.KanbanStatusByIdGQL
  ) {}

  public getKanbanStatus() {
    return this.kanbanStatus
      .watch()
      .valueChanges.pipe(map((result) => result.data.KanbanStatus));
  }

  get status$(): Observable<StatusType> {
    return this._status.asObservable();
  }

  get statuses$(): Observable<StatusType[]> {
    return this._statuses.asObservable();
  }

  public getStatutes(): Observable<StatusType[]> {
    return this.kanbanStatus
      .watch()
      .valueChanges.pipe(map((result) => result.data.KanbanStatus));
  }

  public getStatusById(statusId: string): any {
    return this.kanbanStatusByIdGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.KanbanStatusById));
  }
}
