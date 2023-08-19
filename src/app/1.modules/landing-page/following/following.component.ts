import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { imageItem, imageItemIndex } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';
import { Observable, of } from 'rxjs';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowingComponent {
  // featuredList$: Observable<imageItemIndex[]>;
  imageItemListService = inject(ImageItemIndexService);
  featuredList$ = this.imageItemListService.getAllImages('IN_GALLERY');
}
