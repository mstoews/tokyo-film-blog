import { Route } from '@angular/router';
import { CanDeactivateStatusDetails } from './status.guards';
import { StatusResolver, StatusDetailResolver } from './status.resolver';
import { StatusListComponent } from './status-list.component';
import { StatusDetailsComponent } from './status.details';
import { StatusComponent} from './status.component'

export const statusRoutes: Route[] = [
    {
        path     : '',
        component: StatusComponent,
    }
];
