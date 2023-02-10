import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { profile} from "../../../../models/profile";
import { Observable } from "rxjs";
import { MaterialModule } from "../../../../material.module";

@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  imports: [
   MaterialModule,]
})
export class AddressComponent implements  OnInit {


  constructor (private fb: FormBuilder) {

  }
  ngOnInit() {

  }

  addressForm: FormGroup
onUpdateProfile() {

}
  profile: profile;
  profile$: Observable<profile>;
  createForm(profile: profile) {
    this.addressForm = this.fb.group({
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
