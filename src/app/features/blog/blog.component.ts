import { Component, OnInit, Output } from '@angular/core';
import { BlogService } from 'app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService ) { }

  ngOnInit(): void {
  }

}
