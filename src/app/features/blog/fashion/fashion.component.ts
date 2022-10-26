import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {

  @Input() fashion_image_1!: string ;

  constructor() { }

  ngOnInit(): void {
  }

}
