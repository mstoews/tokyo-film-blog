import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Mainpage } from 'app/models/mainpage';
import { MainPageService } from 'app/services/main-page.service';


@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  sTitle: any;
  adminGroup: FormGroup;
  product: any;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private mainPageService: MainPageService,
    ) {
      this.sTitle = "Administrative Main Page"
    }

  ngOnInit(): void {
    this.createEmptyForm();
  }

  createEmptyForm() {
    this.adminGroup = this.fb.group({
      hero_title: [''],
      features_header: [''],
      features_subheader:[''],
      cta_left: [''],
      cat_right:  [''],
      contact_email:[''],
      contact_telephone:[''],
      contact_shipping: [''],
      active: ['']
    });
  }

    onImages() {

    }

    onDelete(landingPage: any) {

    }

    onCreate() {

    }

    onUpdate(landingPage: any) {

    }

}
