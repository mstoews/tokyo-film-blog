import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionResolver } from 'app/4.services/collection.resolver';
import { CollectionsEditComponent } from './collections-edit/collections-edit.component';
import { CollectionsAdminComponent } from './collections-grid.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CollectionsAdminComponent,
    data: { state: 'collections-admin' },
    title: 'Collections',
  },
  {
    path: 'item/:id',
    title: 'Collections Item',
    component: CollectionsEditComponent,
    resolve: {
      collection: CollectionResolver,
    },
    data: { state: 'item/:id' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CollectionsEditRoutingModule],
})
export class CollectionsEditRoutingModule {}
