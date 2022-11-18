import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService }  from 'app/services/blog.service';
import { Observable, Subscription } from 'rxjs';
import { IImageStorage } from 'app/models/maintenance';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  blogId: string;
  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;
  blogImages$: Observable<IImageStorage[]> ;

  blog!: Blog;
  sub: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: BlogService) { }

  ngOnInit(): void {
      var id: string;
      this.sub = this.activateRoute.params.subscribe(params => {
           id = params['id'];
           const prd = this.blogService.findBlogByUrl(params['id']);
           prd.subscribe((bg) => {
              this.blog = bg as Blog;
              if (id != undefined) {
                this.blogImages$ = this.blogService.getBlogImage(id)
                }
           })
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
