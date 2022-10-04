import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridAGComponent } from './grid.component';
import { CheckboxRenderer } from './checkbox-renderer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DndJSONComponent } from './loadjsondnd/dnd.json.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    GridAGComponent,
    CheckboxRenderer,
    ProgressComponent,
    DndJSONComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [GridAGComponent],
})
export class GridAGModule {}
