import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { imageItem } from 'app/models/imageItem';
import { ImageListService } from 'app/services/image-list.service';
import { AuthService } from 'app/services/auth/auth.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  blogId: string;
  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;
  blogImages$: Observable<imageItem[]>;
  public blog!: Blog;
  public userName: string;
  public blog_id: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router,
    private imageListService: ImageListService ) { }

  ngOnInit(): void {
      let id: string;
      this.userName = this.authService.getUserName();
      // console.log('User Name from blog details : ', this.userName);
      this.blog = this.activateRoute.snapshot.data["blog"];
     
      if (this.blog.id) {
        this.blog_id = this.blog.id;
        // console.log('Blog ID: ' , this.blog_id);
         this.blogImages$ = this.imageListService.getImagesByType(this.blog.id);
      }
  }
  
  ngOnDestroy() {

  }

  backToHome() {
    this.route.navigate(['blog']);
  }

}
