import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService }  from 'app/services/blog.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  blogId: string;
  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;
  blog!: Blog;
  sub: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: BlogService) { }

  ngOnInit(): void {
      this.sub = this.activateRoute.params.subscribe(params => {
           const prd = this.blogService.findBlogByUrl(params['id']);
           prd.subscribe((bg) => {
              this.blog = bg as Blog;
           })
      });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
