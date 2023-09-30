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
import { fadeInOut } from '../../landing-page/animations';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { ImageItemIndex } from 'app/5.models/imageItem';

@Component({
  selector: 'app-cinema-blog',
  templateUrl: './cinema-blog.component.html',
  styleUrls: ['./cinema-blog.css'],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaBlogComponent {
  route = inject(Router);
  blogService = inject(BlogService);
  imageItemIndexService = inject(ImageItemIndexService);

  valueChangedEvent($event: Event) {}

  backToHome() {
    this.route.navigate(['home']);
  }

  allBlogs$ = this.blogService.getCinemaBlog();
}
