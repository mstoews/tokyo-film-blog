import { Route } from '@angular/router';

import { ProductsComponent } from './products.component';

export const PRODUCTS_ROUTES: Route[] = [
  {
    path: '',
    component: ProductsComponent,
  },
];
