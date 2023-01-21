import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Blog } from 'app/models/blog'
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';
import { IImageStorage } from 'app/models/maintenance';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-card',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {


  valueChangedEvent($event: Event) {
  throw new Error('Method not implemented.');
  }

  @Input() blog: Blog;
  blogImages$: Observable<IImageStorage[]> ;

  constructor(
    private router: Router,
    private blogService: BlogService ) {

    }

  ngOnInit(): void {
    this.blogImages$ = this.blogService.getBlogImage(this.blog.id)
    this.blogImages$.subscribe(images => {
      //console.log(JSON.stringify(images));
    })
  }

  onOpenBlog(id: string) {
     this.router.navigate(['blog/detail', id]);
     // this.toggleDrawer();

  }

}
