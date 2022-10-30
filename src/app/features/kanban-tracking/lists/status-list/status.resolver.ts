import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { KanbanService } from '../../module/kanban.service';
import { StatusType, Tag } from './status.types';

@Injectable({
  providedIn: 'root',
})
export class StatusResolver implements Resolve<any> {
  constructor(private _kanbanService: KanbanService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StatusType[]> {
    return this._kanbanService.getKanbanStatus();
  }
}

@Injectable({
  providedIn: 'root',
})
export class StatusDetailResolver implements Resolve<any> {
  constructor(private _router: Router, private _kanbanService: KanbanService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StatusType> {
    return this._kanbanService.getStatusById(route.paramMap.get('status')).pipe(
      // Error here means the requested task is not available
      catchError((error) => {
        // Log the error
        console.error(error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        this._router.navigateByUrl(parentUrl);

        // Throw an error
        return throwError('Error');
      })
    );
  }
}
