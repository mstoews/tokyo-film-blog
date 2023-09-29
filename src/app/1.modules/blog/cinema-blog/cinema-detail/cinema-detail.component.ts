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
  selector: 'app-Cinema-detail',
  templateUrl: './cinema-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaDetailComponent implements OnInit, OnDestroy {
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
