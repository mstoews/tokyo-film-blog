import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogResolver } from 'app/services/blog.resolver';
import { CollectionsEditComponent } from './collections-edit/collections-edit.component';
import { CollectionsAdminComponent } from './collections-grid.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CollectionsAdminComponent,
    data: { state: 'collections-admin' },
  },
  {
    path: 'collection-admin/:id',
    title: 'Thoughts',
    component: CollectionsEditComponent,
    resolve: {
      blog: BlogResolver,
    },
    data: { state: 'collection-admin/:id' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CollectionsEditRoutingModule],
})
export class CollectionsEditRoutingModule {}
