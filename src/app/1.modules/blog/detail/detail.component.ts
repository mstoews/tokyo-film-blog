import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Blog } from 'app/5.models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { imageItem } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';
import { AuthService } from 'app/4.services/auth/auth.service';
import { ScrollService } from 'app/4.services/scroll.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {
  blogId: string;
  blogItem: Observable<Blog>;
  allBlogs$: Observable<Blog[]>;
  blogImages$: Observable<imageItem[]>;
  public blog!: Blog;
  public userName: string;
  public blog_id: string;
  public bottom = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private scrollTo: ScrollService,
    private route: Router,
    private imageListService: ImageListService
  ) {}

  ngOnInit(): void {
    let id: string;
    this.userName = this.authService.getUserName();
    // console.debug('User Name from blog details : ', this.userName);
    this.blog = this.activateRoute.snapshot.data['blog'];

    if (this.blog.id) {
      this.blog_id = this.blog.id;
      // console.debug('Blog ID: ' , this.blog_id);
      this.blogImages$ = this.imageListService.getImagesByType(this.blog.id);
    }
  }

  ngOnDestroy() {}

  onAdd() {
    this.scrollTo.scrollToElementById('comment');
    this.bottom = true;
  }
  gotoTop() {
    this.scrollTo.scrollToElementById('top');
    this.bottom = false;
  }

  backToHome() {
    this.route.navigate(['blog']);
  }
}
