import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-image-menubar',
  templateUrl: './image-menubar.component.html',
})
export class ImageMenubarComponent {
  @Output() notifyParentRefresh: EventEmitter<any> = new EventEmitter()
  @Output() notifyParentAdd: EventEmitter<any> = new EventEmitter()
onClickRefresh() {
  this.notifyParentRefresh.emit()
}
onClickClone() {

}
onClickAdd() {
  this.notifyParentAdd.emit()

}
onClickDelete() {

}


}
