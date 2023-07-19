import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-menubar',
  templateUrl: './image-menubar.component.html',
})
export class ImageMenubarComponent {
  @Output() notifyParentRefresh: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentAdd: EventEmitter<any> = new EventEmitter();
  @Input() title: string = 'Images Buckets';

  onClickRefresh() {
    this.notifyParentRefresh.emit();
  }

  onClickAdd() {
    this.notifyParentAdd.emit();
  }
}
