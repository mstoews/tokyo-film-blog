import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'app/services/policy.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { PolicyDocuments } from 'app/models/policy-documents';

@Component({
  selector: 'app-product-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.css'],
})
export class PolicyEditComponent implements OnInit {
  sTitle: any;
  rich_description: string;
  policyGroup: FormGroup;
  action: string;
  cRAG: string;
  cType: string;
  currentDate: Date;
  policyId: string;
  selectedItemKeys: string;
  allPolicyDocuments$: Observable<PolicyDocuments>;
  prd: any;
  sub: any;
  policyItem$: Observable<PolicyDocuments>;
  

  constructor(
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private _location: Location,
    private afs: AngularFirestore,
    private readonly policyService: PolicyService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.createEmptyForm();
  }

  ngOnInit() {
    var counter = 0;
    this.sTitle = 'Policy Documents';
    this.sub = this.activateRoute.params.subscribe((params) => {
      const policy= this.policyService.findPolicyByUrl(params['id']);
      if (policy) {
        this.policyItem$ = policy;
        this.policyId = params['id'];
        this.policyItem$.subscribe((prd) => {
          if (prd !== undefined) {
            this.rich_description = prd.rich_description;
            this.createForm(prd);
          }
        });
      }
    });

  }

  onDelete(data: PolicyDocuments) {

    data = this.policyGroup.getRawValue();
    this.policyService.delete(data.id.toString());
    this.route.navigate(['admin/policy']);
  }

  onUpdate() {
    const policy = { ...this.policyGroup.value } as PolicyDocuments;
    console.debug('PolicyDocuments can be sold ...: ', policy.show_allowed);
    const dDate = new Date();
    policy.rich_description = this.rich_description;
    const updateDate = dDate.toISOString().split('T')[0];
    this.policyService.update(policy);
  }

  createProduct(results: any) {
    const newPolicy = { ...this.policyGroup.value } as PolicyDocuments;
    this.policyService.update(newPolicy);
    this.policyGroup.setValue(newPolicy);
    this.afs
      .collection('policy')
      .doc(newPolicy.id)
  }

  createEmptyForm() {
    this.policyGroup = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      rich_description: ['', Validators.required],
      user_updated: ['', Validators.required],
      date_created: [new Date(), Validators.required],
      date_updated: [new Date(), Validators.required],
      show_allowed: [true, Validators.requiredTrue]
    });
  }

  createForm(prd: PolicyDocuments) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.policyGroup = this.fb.group({
      id: [prd.id],
      description: [prd.description],
      rich_description: [prd.rich_description],
      show_allowed: [prd.show_allowed],
      user_updated: [prd.user_updated],
      date_created: [prd.date_created],
      date_updated: [prd.date_updated],
    });
  }

  onBackToInventory() {
    this._location.back();
  }

}
