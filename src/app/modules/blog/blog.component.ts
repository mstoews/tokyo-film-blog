import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { fadeInOut } from '../landing-page/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  animations: [fadeInOut],
})
export class BlogComponent implements OnInit {
  onToggleMenu() {
    console.debug('blog - notifiy side menu');
  }

  constructor(private route: Router, private blogService: BlogService) {}

  valueChangedEvent($event: Event) {}

  backToHome() {
    this.route.navigate(['home']);
  }

  allBlogs$: Observable<Blog[]>;

  ngOnInit(): void {
    this.allBlogs$ = this.blogService.getAllPublishedBlog();
  }
}
