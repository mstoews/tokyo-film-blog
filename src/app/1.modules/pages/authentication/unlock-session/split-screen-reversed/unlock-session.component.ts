import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@made-to/animations';
import { FuseAlertType } from '@made-to/components/alert';

@Component({
  selector: 'unlock-session-split-screen-reversed',
  templateUrl: './unlock-session.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class UnlockSessionSplitScreenReversedComponent implements OnInit {
  @ViewChild('unlockSessionNgForm') unlockSessionNgForm!: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  name: string = 'Brian Hughes';
  showAlert: boolean = false;
  unlockSessionForm!: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(private _formBuilder: UntypedFormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.unlockSessionForm = this._formBuilder.group({
      name: [{ value: this.name, disabled: true }],
      password: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Unlock
   */
  unlock(): void {}
}
