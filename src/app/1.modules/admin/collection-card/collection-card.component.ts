import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
