import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Collections, CollectionsPartial } from 'app/models/collection';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CollectionsService } from 'app/services/collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'collections-add',
  templateUrl: './collections-add.component.html',
  styleUrls: ['./collections-add.component.css'],
})
export class CollectionsAddDialog {
  title: string;
  collectionId: string;
  form: FormGroup;


  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private collection: Collections ,
              private collectionService: CollectionsService,
              private afs : AngularFireStorage,
              private route: Router,
              private dialogRef: MatDialogRef<CollectionsAddDialog>) {

      this.title = collection.title;

  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.collection.title, Validators.required],
      date_created: [new Date(), Validators.required],
      id:  [''],
   });

  }

  save() {

  }

  update(results: any) {
    const newCollection = { ...this.form.value } as CollectionsPartial
    this.collectionService.createPartial(newCollection).then ( collection => {
      this.collectionId = collection.id;
      newCollection.id = this.collectionId;
      newCollection.published = false;
      this.collectionService.updatePartial (newCollection);
      this.route.navigate(['collection-admin/collection-admin', this.collectionId]);
    })

    this.close();
  }


  close() {

      this.dialogRef.close();

  }

}

export function openCollectionsAddDialog(dialog: MatDialog, collection: Collections) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = "backdrop-modal-panel";
  config.width = "400px"

  config.data = {
      ...collection
  };

  const dialogRef = dialog.open(CollectionsAddDialog, config);
  return dialogRef.afterClosed();
}

