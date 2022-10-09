import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

  img_1 = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/cassie_scissors.jpg?alt=media&token=102f8292-eb04-45e3-a301-4eb024ad4212";

  constructor() { }

  ngOnInit(): void {
  }

}
