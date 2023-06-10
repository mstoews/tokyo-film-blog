import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Blog } from '../5.models/blog';
import { Observable } from 'rxjs';
import { BlogService } from './blog.service';

@Injectable()
export class BlogResolver  {
  constructor(private blogService: BlogService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blog | undefined> {
    const id = route.paramMap.get('id') as string;
    const blog = this.blogService.findBlogByUrl(id);
    return blog;
  }
}
