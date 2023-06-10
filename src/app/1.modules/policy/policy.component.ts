import { Component, Input } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { openAddPolicyDialog } from './add/add.component';
import { PolicyDocuments } from 'app/5.models/policy-documents';
import { PolicyService } from 'app/4.services/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent {
  policyGroup: FormGroup;
  sTitle: string;
  cRAG: string;
  currentDate: Date;

  policyId: string;

  @Input() title: string;
  @Input() description: string;
  @Input() rich_description: string;

  // Lightbox setup
  private _subscription: Subscription;

  // blog dictionary
  allPolicies$: Observable<PolicyDocuments[]>;

  columnsToDisplay: string[] = ['description', 'rich_description'];

  policy: PolicyDocuments;

  selectedItemKeys: any;

  constructor(
    private policyService: PolicyService,
    private fb: FormBuilder,
    private route: Router,
    private dialog: MatDialog
  ) {}

  onOpenRow(row: any) {
    this.route.navigate(['policy/policy-admin', row.id]);
  }

  onAdd() {
    openAddPolicyDialog(this.dialog, this.policy)
      .pipe(filter((val) => !!val))
      .subscribe((val) => console.debug('new course value:', val));
  }

  ngOnInit() {
    this.Refresh();
    this.cRAG = '#238823';
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  onCellDoublClicked(e: any) {
    this.title = e.title;
    this.rich_description = e.rich_description;
    this.policyGroup.setValue(e);
  }

  onNotify(event: any) {
    this.policyGroup.setValue(event.data);
  }

  Refresh() {
    this.allPolicies$ = this.policyService.getAll();
  }

  onCreate(data: any) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    const newPolicy = { ...this.policyGroup.value } as PolicyDocuments;
    newPolicy.date_updated = updateDate;
    newPolicy.date_created = updateDate;
    this.policyService.create(newPolicy);
  }

  onDelete(data: PolicyDocuments) {
    data = this.policyGroup.getRawValue();
    this.policyService.delete(data.id.toString());
  }

  valueChangedEvent(e: any) {
    // console.debug(`blog grid value changed ${e}`)
  }

  createForm(policy: PolicyDocuments) {
    this.sTitle = 'Policy - ' + policy.description;
    this.policyGroup = this.fb.group({
      id: [policy.id],
      description: [policy.description],
      rich_description: [policy.rich_description],
      user_updated: [policy.user_updated],
      date_created: [policy.date_created],
      date_updated: [policy.date_updated],
    });
  }
}
