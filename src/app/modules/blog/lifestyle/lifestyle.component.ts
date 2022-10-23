import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.css']
})
export class LifestyleComponent implements OnInit {
  title = "Thoughts and Images"
  blog_image = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/cassie_scissors.jpg?alt=media&token=102f8292-eb04-45e3-a301-4eb024ad4212";
  blog_image2 = "https://picsum.photos/id/1/200/300";
  blog_description = "Patterns and Cutting"
  date="July 10 2022"
  constructor() { }

  ngOnInit(): void {
  }

}
