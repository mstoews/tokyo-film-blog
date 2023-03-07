import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'app/models/blog';
import { IImageStorage } from 'app/models/maintenance';
import { BlogService } from 'app/services/blog.service';
import { Observable } from 'rxjs';
import { imageItem } from "../../../models/imageItem";
import { ImageListService } from "../../../services/image-list.service";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent implements OnInit {

  @Input() blog: Blog;
  blogImages$: Observable<imageItem[]> ;

  constructor(
    private route: Router,
    private imageListService: ImageListService,
    ) { }

  ngOnInit(): void {
    this.blogImages$ = this.imageListService.getImagesByType(this.blog.id)
    console.debug('on initialize...', this.blog.id);
    this.blogImages$.subscribe(images => {
      console.debug(JSON.stringify(images));
    })
  }

  onOpenBlog(id: string) {
      this.route.navigate(['blog/detail', id]);
  }


}
