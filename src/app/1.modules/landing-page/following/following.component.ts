import { ChangeDetectionStrategy, Component } from '@angular/core';
import { imageItem } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowingComponent {
  featuredList$: Observable<imageItem[]>;

  constructor(private imageListService: ImageListService) {
    this.featuredList$ = this.imageListService.getImagesByType('IN_GALLERY');
  }
}
