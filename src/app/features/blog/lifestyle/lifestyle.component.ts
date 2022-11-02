import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog.service';

@Component({
  selector: 'blog-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.css']
})
export class LifestyleComponent implements OnInit {
  title = "Thoughts, Images and Impressions"

  main_image = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fimage_knitting_yellow.jpg?alt=media&token=583f566c-f75f-45c5-bb44-bbfee61eace7";
  blog_image = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/uploaded%2Fthumbnails%2Fcassie_suit_dummy_400x400_200x200.jpg?alt=media&token=55b813e4-21ed-414d-a202-690ec6d33233";

  blog_image2 = "https://firebasestorage.googleapis.com/v0/b/made-to-cassie.appspot.com/o/thumbnails%2FIMG_0017_polarr_200x200.JPEG?alt=media&token=3e0e59ec-b727-44da-adbf-8880991713ab";
  blog_description = "Patterns and Cutting"
  date="July 10 2022"

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

  }

}
