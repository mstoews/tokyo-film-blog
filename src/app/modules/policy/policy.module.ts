import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AddPolicyComponentDialog} from './add/add.component';
import { SafePipe } from './safe.pipe';
import { PolicyPreviewComponent } from './policy-preview/policy-preview.component';
import { PolicyComponent } from './policy.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';
import { MaterialModule } from 'app/material.module';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { SharedModule } from '../shared-module/shared.module';
import { PolicyRoutingModule } from './policy-routing.module';
import { FuseCardModule } from '@fuse/components/card';



const declarations = [
  AddPolicyComponentDialog,
  SafePipe,
  PolicyPreviewComponent,
  PolicyComponent,
  PolicyEditComponent
];

const modules = [
  CommonModule,
  MaterialModule,
  DxHtmlEditorModule,
  SharedModule,
  PolicyRoutingModule,
  NgOptimizedImage,
  FuseCardModule,
  
];

@NgModule({
  declarations: [...declarations],
  imports: [
    ...modules
  ]
})
export class PolicyModule { }
