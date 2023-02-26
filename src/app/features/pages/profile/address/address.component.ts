import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from '../../../../models/profile';
import { from, map, Observable } from 'rxjs';
import { MaterialModule } from '../../../../material.module';
import { ProfileService } from 'app/services/profile.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../../../models/products';

@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './address-2.html',
  imports: [MaterialModule],
})
export class AddressComponent implements OnInit {
  profile: ProfileModel;
  profile$: Observable<ProfileModel[]>;
  formGroup: FormGroup;

  updateBtnState: boolean = false;
  userId: string;
  email: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private snack: MatSnackBar
  ) {
   
    this.authService.afAuth.authState.subscribe((user) => {
      this.userId = user?.uid;
      this.email = user?.email;
    });
    const theDate = new Date();
    const address: ProfileModel = {
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
    //this.profileService.getUserProfile(this.userId).subscribe(profile  => this.createForm(profile));
    this.profile$ = this.profileService.getAll()
    
    this.profile$.subscribe((page) => {
      console.log('profile count', page.length);
      if (page.length > 0) {
        this.profile = page[0]
        this.createForm(this.profile)
      } 
    })
   
  }

  onUpdateProfile() {
    let data = this.formGroup.getRawValue();
    this.updateBtnState = true;
    this.profileService.update(data);
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
      country:  [profile.country, Validators.required],
      phone_number: [profile.phone_number, Validators.required],
      created_date: theDate.toDateString(),
      userId: this.userId,
    }
    );
  }
}
