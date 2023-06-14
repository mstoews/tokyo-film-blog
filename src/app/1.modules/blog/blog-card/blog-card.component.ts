import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'app/5.models/blog';
import { IImageStorage } from 'app/5.models/maintenance';
import { BlogService } from 'app/4.services/blog.service';
import { Observable } from 'rxjs';
import { imageItem } from '../../../5.models/imageItem';
import { ImageListService } from '../../../4.services/image-list.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent implements OnInit {
  @Input() blog: Blog;
  blogImages$: Observable<imageItem[]>;

  constructor(
    private route: Router,
    private imageListService: ImageListService
  ) {}

  ngOnInit(): void {
    this.blogImages$ = this.imageListService.getImagesByType(this.blog.id);
    //console.debug('on initialize...', this.blog.id);
    this.blogImages$.subscribe((images) => {
      //console.debug(JSON.stringify(images));
    });
  }

  onOpenBlog(id: string) {
    this.route.navigate(['blog/detail', id]);
  }
}
