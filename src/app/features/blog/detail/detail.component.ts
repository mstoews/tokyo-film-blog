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
  
  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
      var id: string;
      this.blog = this.activateRoute.snapshot.data["blog"];
      this.blogImages$ = this.blogService.getBlogImage(this.blog.id);

  }
  ngOnDestroy() {

  }

  backToHome() {
    this.route.navigate(['blog']);
  }


}
