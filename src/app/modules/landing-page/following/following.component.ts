import { Component } from '@angular/core';
import { imageItem } from 'app/models/imageItem';
import { ImageListService } from 'app/services/image-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html'
})
export class FollowingComponent {

  featuredList$: Observable<imageItem[]>;

  constructor(private imageListService: ImageListService) {
    this.featuredList$ = this.imageListService.getImagesByType('IN_GALLERY');
   }

}
