import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';


@Component({
  selector: 'sign-up-modern',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SignUpModernComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;

  alert: {type: FuseAlertType;
          message: string} = {type: 'success', message: 'Registration is successful'};
  signUpForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company: [''],
      agreements: ['', Validators.requiredTrue]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signUp(): void {}
}
