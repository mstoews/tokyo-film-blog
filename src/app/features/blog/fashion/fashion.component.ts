import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog'
import { Router } from '@angular/router';

@Component({
  selector: 'blog-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {

  @Input() blog: Blog;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onOpenBlog() {
     console.log('open blog window...')
     this.router.navigate(['shop/blog-detail',this.blog.id]);
  }

}
