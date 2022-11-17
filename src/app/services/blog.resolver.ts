import { Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Blog } from '../models/blog'
import { Observable } from 'rxjs';
import { BlogService } from "./blog.service";

@Injectable()
export class BlogResolver implements Resolve<Blog | undefined> {
    constructor(private blogService: BlogService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog | undefined> {
        const id = route.paramMap.get('id') as string;
        console.log('BlogResolver: ', id);
        return this.blogService.findBlogByUrl(id);
    }
}

