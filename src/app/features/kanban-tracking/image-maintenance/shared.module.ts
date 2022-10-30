import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { StatusModule } from '../lists/status-list/status.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule
{
}
