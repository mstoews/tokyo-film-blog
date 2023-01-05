import { Component } from '@angular/core';
import { Blog } from 'app/models/blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent {
  cRAG: any;
  sTitle: any;
  blogGroup: any;
  blogImages$: any;
  blog: any;
  blogItem$: Observable<Blog>;

  onUpdate(arg0: any) {  }
  onCreate(arg0: any) {  }
  onDelete(arg0: any) {  }
  onImages() {  }
  closeDialog() {  }
}
