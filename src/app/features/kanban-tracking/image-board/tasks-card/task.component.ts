import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ITask } from '../../image-maintenance/tasks.model';
import { MatDialog } from '@angular/material/dialog';
import { KanbanService } from '../../module/kanban.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() item: ITask;
  @Input() title: string;
  @Output() private notifyOpenTaskDialog: EventEmitter<any> =
    new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  openMenu(): void {
    //  console.log ('Open Type');
  }

  onCardClick(event) {
    //  console.log (`open the edit dialog : ${event.summary}`);
  }

  updateData(partyRef: string) {
    // let party!: PartyRefService;
    // party.clientRef = '';
    // party.partyRef = partyRef;
    // party.partyType = this.inPartyType;
    // this.kanbanService.setParty(partyRef);
  }

  onAdd(data) {
    //  console.log ('OnAdd from KanbanTasks');
    this.notifyOpenTaskDialog.emit(data);
  }
}
