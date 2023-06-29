import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Blog } from '../5.models/blog';
import { Observable } from 'rxjs';
import { BlogService } from './blog.service';

@Injectable()
export class BlogResolver implements Resolve<Blog> {
  blogService = inject(BlogService);
  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot ): Observable<Blog | undefined> {
    return this.blogService.findBlogByUrl(route.paramMap.get('id')!);
  }
}
