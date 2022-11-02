import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { DxHtmlEditorComponent } from 'devextreme-angular';
import { TextService, TabConfig } from './text.service';
import { TextEditorService } from 'app/services/text-editor.service';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  providers: [TextService, TextEditorService],
})
export class TextEditorComponent implements OnInit {
  @ViewChild('editor', { static: false }) editor: DxHtmlEditorComponent;
  @Input() public valueContent: string;
  @Input() control: FormControl = new FormControl();
  @Output() onValueChangedEvent: EventEmitter<any> = new EventEmitter();
  editorValueType = 'html';
  editorValue: string;

  tabs: TabConfig[];

  toolbarButtonOptions: any = {
    text: 'Show markup',
    stylingMode: 'text',
    onClick: () => (this.popupVisible = false),
  };

  currentTab: string[];
  popupVisible: boolean;
  isMultiline: boolean;

  constructor(
    public service: TextService,
    public textEditorService: TextEditorService
    ) {
    this.tabs = service.getTabsData();
    this.currentTab = this.tabs[2].value;
    this.isMultiline = service.isMultiline;
  }

  onValueChanged($event: any) {
    this.onValueChangedEvent.emit($event.value);
  }

  ngOnInit(): void {}
}
