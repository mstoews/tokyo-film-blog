import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Blog } from 'app/5.models/blog';
import { Router } from '@angular/router';
import { BlogService } from 'app/4.services/blog.service';
import { ImageListService } from 'app/4.services/image-list.service';

@Component({
  selector: 'blog-card',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FashionComponent implements OnInit {
  onAdd() {
    // console.debug('onAdd --- add a new comment');
  }

  valueChangedEvent($event: Event) {
    throw new Error('Method not implemented.');
  }

  @Input() blog: Blog;
  blogImages$: any;

  constructor(
    private router: Router,
    private imageListService: ImageListService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogImages$ = this.imageListService.getImagesByType(this.blog.id);
  }

  onOpenBlog(id: string) {
    this.router.navigate(['blog/detail', id]);
    // this.toggleDrawer();
  }
}
