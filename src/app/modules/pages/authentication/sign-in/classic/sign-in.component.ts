import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { fuseAnimations } from '@fuse/animations'
import { FuseAlertType } from '@fuse/components/alert'
import { AuthService } from 'app/services/auth/auth.service'

@Component({
  selector: 'sign-in-classic',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class SignInClassicComponent implements OnInit {
resetPassword() {
  const newPassword = '....';
  const actionCode = '';
  this.authService.afAuth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
    // Password reset has been confirmed and new password updated.

    // TODO: Display a link back to the app, or sign-in the user directly
    // if the page belongs to the same domain as the app:
    // auth.signInWithEmailAndPassword(accountEmail, newPassword);

    // TODO: If a continue URL is available, display a button which on
    // click redirects the user back to the app via continueUrl with
    // additional state determined from that URL's parameters.
  }).catch((error) => {
    // Error occurred during confirmation. The code might have expired or the
    // password is too weak.
  });

}
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  }
  signInForm!: UntypedFormGroup
  showAlert: boolean = false
  redirect = ['/home']

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: [''],
      password: [''],
      rememberMe: [''],
    })
  }

  signUpEmail(){
    this.router.navigate(['/authentication/sign-up/modern']);
  }

  async signInEmail() {
    const { email, password } = this.signInForm.value
    // console.log(`email ${email} , ${password}`)
    try {
      const loggedIn = await this.authService.signIn(email, password)
      this.router.navigate(this.redirect)
    } catch (e) {
      console.error(e)
    }
  }
}
