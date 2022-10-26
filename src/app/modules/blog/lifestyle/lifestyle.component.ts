import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.css']
})
export class LifestyleComponent implements OnInit {
  title = "Thoughts and Images"
  main_image = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fimage_knitting_yellow.jpg?alt=media&token=583f566c-f75f-45c5-bb44-bbfee61eace7";
  blog_image = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/thumbnails%2FIMG_0841_polarr_200x200.JPEG?alt=media&token=4dbe7bfe-a87e-42d8-9de8-773c37f8fd45";
  blog_image2 = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/thumbnails%2FIMG_0017_polarr_200x200.JPEG?alt=media&token=3e0e59ec-b727-44da-adbf-8880991713ab";
  blog_description = "Patterns and Cutting"
  date="July 10 2022"
  constructor() { }

  ngOnInit(): void {
  }

}
