import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'app/models/blog';
import { IImageStorage } from 'app/models/maintenance';
import { BlogService } from 'app/services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent implements OnInit {

  @Input() blog: Blog;
  blogImages$: Observable<IImageStorage[]> ;

  constructor(
    private route: Router,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogImages$ = this.blogService.getBlogImage(this.blog.id)
    //console.log('on initialize...', this.blog.id);
    this.blogImages$.subscribe(images => {
      //console.log(JSON.stringify(images));
    })
  }

  onOpenBlog(id: string) {
      this.route.navigate(['blog/detail', id]);
  }


}
