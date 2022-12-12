import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BlogService } from 'app/services/blog.service';
import { Blog } from 'app/models/blog'
import { Observable } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

constructor(
    private route: Router,
    private blogService: BlogService ) { }

  valueChangedEvent($event: Event) {
throw new Error('Method not implemented.');
}

backToHome() {
  this.route.navigate(['home']);
}

  allBlogs$: Observable<Blog[]>;
  blog: Blog;


  ngOnInit(): void {

    this.allBlogs$ = this.blogService.getAll();
    // this.allBlogs$.subscribe(blogs => {
    //   console.log(JSON.stringify(blogs));
    // })

  }

}
