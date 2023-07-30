import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'app/5.models/blog';
import { IImageStorage } from 'app/5.models/maintenance';
import { BlogService } from 'app/4.services/blog.service';
import { Observable } from 'rxjs';
import { imageItem, imageItemIndex } from '../../../5.models/imageItem';
import { ImageListService } from '../../../4.services/image-list.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent implements OnInit {
  @Input() blog: Blog;
  blogImages$: Promise<Observable<(imageItemIndex & { id: string;})[]>>;
  route = inject(Router);
  imageItemIndexService = inject(ImageItemIndexService);

  async ngOnInit() {
    this.blogImages$ = this.imageItemIndexService.getOriginalImageListByType(this.blog.id);
  }

  onOpenBlog(id: string) {
    this.route.navigate(['blog/detail', id]);
  }
}
