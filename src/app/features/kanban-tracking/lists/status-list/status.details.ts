import {
  Component,
  Inject,
  Input,
  Optional,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusType } from './status.types';

@Component({
  selector: 'status-detail',
  template: `
    <mat-card>
      <h1 mat-dialog-title>Status Update</h1>
      <div mat-dialog-content>
        <form [formGroup]="formGroup" #myForm="ngForm">
          <mat-form-field>
            <input
              matInput
              placeholder="Type"
              required
              formControlName="status"
          /></mat-form-field>

          <mat-form-field>
            <input
              matInput
              placeholder="Description"
              required
              formControlName="description"
          /></mat-form-field>

          <mat-form-field>
            <input
              matInput
              placeholder="Update User"
              formControlName="updateusr"
          /></mat-form-field>

          <mat-form-field>
            <input
              matInput
              placeholder="Update Date"
              formControlName="updatedte"
          /></mat-form-field>
        </form>
      </div>

      <div mat-dialog-actions>
        <button
          mat-button
          (click)="onUpdate()"
          [disabled]="!myForm.form.valid"
          mat-flat-button
          color="primary"
        >
          Update
        </button>

        <button
          mat-button
          (click)="onCreate()"
          [disabled]="!myForm.form.valid"
          mat-flat-button
          color="primary"
        >
          Insert
        </button>

        <button
          mat-button
          (click)="onDelete()"
          [disabled]="!myForm.form.valid"
          mat-flat-button
          color="primary"
        >
          Delete
        </button>

        <button mat-button (click)="closeDrawer()" mat-flat-button color="warn">
          Close
        </button>
      </div>
    </mat-card>
  `,
  styles: ['.mat-card { font-weight: normal; }'],
})
export class StatusDetailsComponent implements OnInit {
  formGroup: FormGroup;
  @Input() status: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('create form', this.status);
    this.createForm();
  }

  createForm() {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];

    const status = {
      description: 'Some Description',
      status: 'OPEN',
      updatedte: updateDate,
      updateusr: 'ADMIN',
    };

    this.status = status;
    this.formGroup = this.fb.group({
      status: [this.status.status],
      description: [this.status.description],
      updatedte: [this.status.updatedte],
      updateusr: [this.status.updateusr],
    });
    console.log('On create');
  }

  onCreate() {
    const data = this.formGroup.getRawValue();
    // this.dialogRef.close({ event: 'Create', data });
  }

  OnStatusChange(event: any) {
    console.log('Status changed in details ...', event);
    this.status = event;
  }

  onUpdate() {
    const data = this.formGroup.getRawValue();
    // this.dialogRef.close({ event: 'Update', data });
  }

  onDelete() {
    const data = this.formGroup.getRawValue();
    // this.dialogRef.close({ event: 'Delete', data });
  }

  closeDrawer() {
    console.log('Close the door!');
  }
}
