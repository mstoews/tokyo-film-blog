import { Component, OnInit, Output } from '@angular/core';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService ) { }

  allBlogs$: Observable<Blog[]>;
  blog: Blog;


  ngOnInit(): void {
    this.allBlogs$ = this.blogService.getAll();
  }

}
