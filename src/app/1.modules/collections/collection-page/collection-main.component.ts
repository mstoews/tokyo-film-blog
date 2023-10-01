import { Component, OnInit, inject } from '@angular/core';
import { CollectionsService } from 'app/4.services/collections.service';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { Observable } from 'rxjs';
import { Collection } from 'app/5.models/collection';
import { ImageItemIndex } from 'app/5.models/imageItem';
import { ActivatedRoute } from '@angular/router';
import { Lightbox, initTE } from 'tw-elements';

interface collectionData {
  collection: Collection;
  imageItemIndex: ImageItemIndex[];
}

@Component({
  selector: 'app-collection-main',
  templateUrl: './collection-main.component.html',
})
export class CollectionMainComponent implements OnInit {

  imageListService = inject(ImageItemIndexService);
  collectionService = inject(CollectionsService);
  activateRoute = inject(ActivatedRoute);
  allCollections$ = this.collectionService.getAll();
  collection: Collection;
  collectionImages$: Observable<ImageItemIndex[]>;
  collectionId: string;

  ngOnInit(): void {
    initTE({ Lightbox });
    this.collection = this.activateRoute.snapshot.data['collection'];
    this.collectionImages$ = this.imageListService.getAllImages(this.collection.id);
  }
}
