import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from '../../../../models/profile';
import { first, from, map, Observable, OperatorFunction } from 'rxjs';
import { MaterialModule } from '../../../../material.module';
import { ProfileService } from 'app/services/profile.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps} from 'app/services/db-utils'


@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './address.component.html',
  imports: [MaterialModule],
})
export class AddressComponent implements OnInit {
  profile: ProfileModel;
  profile$: Observable<ProfileModel[]>;
  formGroup: FormGroup;

  updateBtnState: boolean = false;
  userId: string;
  email: string;
  profileId: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private snack: MatSnackBar
  ) {
    const theDate = new Date();
    const address: ProfileModel = {
      id: '',
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      province_state: '',
      postal_code: '',
      phone_number: '',
      country: '',
      created_date: theDate.toDateString(),
      userId: this.userId,
    };
    this.createForm(address);
    this.updateBtnState = false;
  }

  ngOnInit() {
   
    this.authService.afAuth.authState.subscribe((user) => {
      this.userId = user?.uid;
      this.email = user?.email;

      let collection = this.afs.collection<ProfileModel>(`users/${this.userId}/profile`);
      const profiles = collection.valueChanges({idField: 'id'});

      console.debug('ngOnInit', this.userId);

      // return only the first element of document which constains the only profile for the user ID if it exists.

      profiles.pipe(first()).subscribe(ref => {
       if ( ref.length > 0  )
        ref.forEach(mr => {
          console.debug(mr);
          this.profileId = mr.id;
          this.createForm(mr);
        })
      })
    });
  }

  onUpdateProfile() {
    let data = this.formGroup.getRawValue();
    this.updateBtnState = true;
    console.debug('update address data: ', JSON.stringify(data));
    data.id = this.profileId;
    console.debug(`update address data:  ${JSON.stringify(data)} userid : ${this.userId}`);
    this.profileService.update(this.userId, data);
    this.updateBtnState = false;
  }

  createForm(profile: ProfileModel) {
    const theDate = new Date();
    this.formGroup = this.fb.group({
      email: [profile.email, Validators.required],
      first_name: [profile.first_name, Validators.required],
      last_name: [profile.last_name, Validators.required],
      middle_name: [profile.middle_name, Validators.required],
      address_line1: [profile.address_line1, Validators.required],
      address_line2: [profile.address_line2, Validators.required],
      city: [profile.city, Validators.required],
      province_state: [profile.province_state, Validators.required],
      postal_code: [profile.postal_code, Validators.required],
      country: [profile.country, Validators.required],
      phone_number: [profile.phone_number, Validators.required],
      created_date: theDate.toDateString(),
      userId: this.userId,
    });
  }
}
function pipe(arg0: OperatorFunction<unknown, void>): Partial<import("rxjs").Observer<(ProfileModel & { id: string; })[]>> {
  throw new Error('Function not implemented.');
}

