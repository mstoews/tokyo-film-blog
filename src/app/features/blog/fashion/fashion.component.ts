import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Blog } from 'app/models/blog'
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'blog-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {


  valueChangedEvent($event: Event) {
  throw new Error('Method not implemented.');
  }

  @Input() blog: Blog;


  constructor(
    private router: Router,
    private blogService: BlogService ) { }

  ngOnInit(): void { }

  onOpenBlog(id: string) {
     this.router.navigate(['blog/detail', id]);
     // this.toggleDrawer();

  }

}
