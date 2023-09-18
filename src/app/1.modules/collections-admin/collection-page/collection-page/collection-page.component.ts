import {
  Component,
  inject,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { imageItemIndex } from 'app/5.models/imageItem';

import { ImageListService } from 'app/4.services/image-list.service';
import { CollectionsService } from 'app/4.services/collections.service';
import GLightbox from 'glightbox';

@Component({
  selector: 'collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.css'],
})
export class CollectionPage {

  imageListService = inject(ImageListService);
  images$: Observable<imageItemIndex[]>;

  collectionService = inject(CollectionsService);
  collection$ = this.collectionService.getAll();
  
}
