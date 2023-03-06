import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService }  from 'app/services/blog.service';
import { Observable } from 'rxjs';
import { IImageStorage } from 'app/models/maintenance';
import { imageItem } from 'app/models/imageItem';
import { ImageListService } from 'app/services/image-list.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  blogId: string;
  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;
  blogImages$: Observable<imageItem[]> ;

  blog!: Blog;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private imageListService: ImageListService,
    private blogService: BlogService)
     { }

  ngOnInit(): void {
      let id: string;
      this.blog = this.activateRoute.snapshot.data["blog"];
      if (this.blog.id) {
         this.blogImages$ = this.imageListService.getImagesByType(this.blog.id);
      }
  }
  ngOnDestroy() {

  }

  backToHome() {
    this.route.navigate(['blog']);
  }


}
