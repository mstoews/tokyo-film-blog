import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog'

@Component({
  selector: 'blog-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {

  @Input() blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

  onOpenBlog() {
     console.log('open blog window...')
  }

}
