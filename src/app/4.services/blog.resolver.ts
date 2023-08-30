import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Blog } from '../5.models/blog';
import { Observable } from 'rxjs';
import { BlogService } from './blog.service';

@Injectable()
export class BlogResolver  {
  blogService = inject(BlogService);
  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot ): Observable<Blog | undefined> {
    return this.blogService.findBlogByUrl(route.paramMap.get('id')!);
  }
}


@Injectable()
export class TailoringResolver  {
  blogService = inject(BlogService);
  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot ): Observable<Blog | undefined> {
    return this.blogService.findBlogByUrl(route.paramMap.get('id')!);
  }
}
