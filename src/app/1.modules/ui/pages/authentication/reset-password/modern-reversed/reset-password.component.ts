import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@made-to/animations';
import { FuseAlertType } from '@made-to/components/alert';
import { FuseValidators } from '@made-to/validators';

@Component({
  selector: 'reset-password-modern-reversed',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ResetPasswordModernReversedComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  resetPasswordForm!: UntypedFormGroup;
  showAlert: boolean = false;

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
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
      }
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset password
   */
  resetPassword(): void {}
}