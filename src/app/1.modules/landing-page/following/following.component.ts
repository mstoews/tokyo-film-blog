import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { imageItem, ImageItemIndex } from 'app/5.models/imageItem';
import { ImageListService } from 'app/4.services/image-list.service';
import { Observable, of } from 'rxjs';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { Lightbox,  initTE } from 'tw-elements';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowingComponent implements OnInit {
  ngOnInit(): void {
      initTE({ Lightbox });
  }
  // featuredList$: Observable<imageItemIndex[]>;

  imageItemListService = inject(ImageItemIndexService);
  featuredList$ = this.imageItemListService.getAllImages('IN_NOT_USED');
}

