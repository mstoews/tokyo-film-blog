import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { SharedModule } from 'app/modules/shared-module/shared.module';
import { AdvancedSearchComponent } from './advanced-search.component';
import { DragNDropComponent } from '../../../components/drag-n-drop/drag-n-drop.component';

export const routes: Route[] = [
    {
        path     : '',
        component: AdvancedSearchComponent
    }
];

@NgModule({
    declarations: [
        AdvancedSearchComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FuseHighlightModule,
        SharedModule,
        DragNDropComponent
    ],
    exports: [DragNDropComponent]
})
export class AdvancedSearchModule
{
}
