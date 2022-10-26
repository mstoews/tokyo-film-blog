import { Route } from '@angular/router';
import { PricingTableComponent } from 'app/features/admin/pages/pricing/table/table.component';

export const pricingTableRoutes: Route[] = [
    {
        path     : '',
        component: PricingTableComponent
    }
];
