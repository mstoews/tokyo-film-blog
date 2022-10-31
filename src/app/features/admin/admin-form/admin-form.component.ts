import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Mainpage } from 'app/models/main_page';
import { MainPageService } from 'app/services/main-page.service';


@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
sTitle: any;
adminGroup: FormGroup;

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


    closeDialog() {
    throw new Error('Method not implemented.');
    }
    onImages() {
    throw new Error('Method not implemented.');
    }
    product: any;
    onDelete(arg0: any) {
    throw new Error('Method not implemented.');
    }
    onCreate() {
    throw new Error('Method not implemented.');
    }
    onUpdate(arg0: any) {
    throw new Error('Method not implemented.');
    }

}
