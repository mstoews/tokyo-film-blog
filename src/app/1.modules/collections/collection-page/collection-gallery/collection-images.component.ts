import { Component, OnInit, inject } from '@angular/core';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import {
  Lightbox,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-collection-gallery',
  templateUrl: './collection-images.component.html',
  styleUrls: ['./collection-images.component.css']
})
export class CollectionImagesComponent implements OnInit   {
   ngOnInit(): void {
      initTE({ Lightbox });
   }

   imageListService = inject(ImageItemIndexService);
   collectionImages$ = this.imageListService.getAllImages('IN_NOT_USED');

}
