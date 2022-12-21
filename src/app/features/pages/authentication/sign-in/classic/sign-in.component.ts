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
