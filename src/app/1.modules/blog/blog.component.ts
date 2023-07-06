import { ChangeDetectionStrategy, Component, OnInit, Output, ViewChild } from '@angular/core';
import { BlogService } from 'app/4.services/blog.service';
import { Blog } from 'app/5.models/blog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { fadeInOut } from '../landing-page/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  onAdd() {
    // console.log('Add a comment to the blog');
  }
  onToggleMenu() {
    //console.debug('blog - notifiy side menu');
  }

  constructor(private route: Router, private blogService: BlogService) {}

  valueChangedEvent($event: Event) {}

  backToHome() {
    this.route.navigate(['home']);
  }

  allBlogs$ = this.blogService.getAllPublishedBlog();

  ngOnInit(): void {

  }
}
