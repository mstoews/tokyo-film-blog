import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxHtmlEditorModule  } from 'devextreme-angular';
import { TextEditorComponent } from './text-editor.component';
import { TextService } from './text.service';



@NgModule({
  declarations: [TextEditorComponent],
  imports: [
    CommonModule,
    DxHtmlEditorModule,
  ],
  providers: [TextService],
  exports: [TextEditorComponent]
})
export class TextEditorModule { }
