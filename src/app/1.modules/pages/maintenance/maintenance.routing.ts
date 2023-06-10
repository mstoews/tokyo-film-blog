import { Route } from '@angular/router';
import { MaintenanceComponent } from 'app/features/admin/pages/maintenance/maintenance.component';

export const maintenanceRoutes: Route[] = [
    {
        path     : '',
        component: MaintenanceComponent
    }
];
