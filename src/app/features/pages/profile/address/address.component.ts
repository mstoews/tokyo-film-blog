import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IProfile } from "../../../../models/profile";
import { Observable } from "rxjs";
import { MaterialModule } from "../../../../material.module";
import { profileService } from "app/services/profile.service";
import { IpcNetConnectOpts } from "net";

@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  imports: [
    MaterialModule,]
})
export class AddressComponent implements OnInit {
onUpdate(arg0: any) {
throw new Error('Method not implemented.');
}

  profile: IProfile;
  profile$: Observable<IProfile>;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    profileService: profileService,
    ) {

      this.profile$ = profileService.getUserProfile();

      const address : IProfile = {
        email: '',
        first_name: '',
        last_name:'',
        middle_name:'',
        address_line1:'',
        address_line2: '',
        city: '',
        provence_state: '',
        postal_code: '',
        phone_number: ''
      }

      this.createForm(address);
  }
  ngOnInit() {


  }

  onUpdateProfile() {
    let data = this.formGroup.getRawValue();
    
  }



  createForm(profile: IProfile) {
    this.formGroup = this.fb.group({
      email: [profile.email],
      first_name: [profile.first_name],
      last_name: [profile.last_name],
      middle_name: [profile.middle_name],
      address_line1: [profile.address_line1],
      address_line2: [profile.address_line2],
      city: [profile.city],
      provence_state: [profile.provence_state],
      postal_code: [profile.postal_code],
      phone_number: [profile.phone_number]
    })
  }

}
