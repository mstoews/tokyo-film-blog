import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';
import { Collections } from 'app/5.models/collection';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.css']
})
export class CollectionPreviewComponent implements OnInit, OnDestroy{
  @Input() collection: Collections;
  Title = '';
  Description = '';
  imageListService = inject(ImageListService);
  collectionsImages: imageItem[] = [];
  subCollections: any;

  constructor() { }

  ngOnInit(): void {
    this.Title = this.collection.title;
    this.Description = this.collection.body;
    this.Refresh(this.collection.id);
   }

   Refresh(id: string){

      this.subCollections = this.imageListService
        .getImagesByType(id)
        .subscribe((item) => {
          this.collectionsImages = item;
        });
    }

    EditTitle(id: string)  {
      let description = 'A new description';
      this.imageListService.updateCollectionDescription(id, description);
    }

    ngOnDestroy(): void {
      this.subCollections.unsubscribe();
    }
}
