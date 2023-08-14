import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initTE, Lightbox } from 'tw-elements';

@Component({
  selector: 'app-tw-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tw-lighthouse.component.html',
  styleUrls: ['./tw-lighthouse.component.css']
})
export class TwLighthouseComponent implements OnInit   {

  ngOnInit() {
    initTE({ Lightbox });
  }

}
