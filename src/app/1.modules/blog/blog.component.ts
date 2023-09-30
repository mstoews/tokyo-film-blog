import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { BlogService } from 'app/4.services/blog.service';
import { Blog } from 'app/5.models/blog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { fadeInOut } from '../landing-page/animations';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { ImageItemIndex } from 'app/5.models/imageItem';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  onAdd() {
    // console.debug('Add a comment to the blog');
  }

  route = inject(Router);
  blogService = inject(BlogService);
  imageItemIndexService = inject(ImageItemIndexService);

  valueChangedEvent($event: Event) {}

  backToHome() {
    this.route.navigate(['home']);
  }

  allBlogs$ = this.blogService.getAllPublishedBlog();

  ngOnInit(): void {
    // this.allBlogs$.pipe().subscribe((blogs) => {
    //   blogs.forEach((blog) => {
    //     console.log('Blog image is undefine',blog.image);
    //     this.imageItemIndexService.getAllImages(blog.id).subscribe((images) => {
    //       console.log(images);
    //     });
    //   });
    // });
  }
}
