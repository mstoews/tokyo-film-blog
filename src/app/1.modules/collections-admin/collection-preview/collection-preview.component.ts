import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
} from '@angular/core';
import { ImageListService } from 'app/4.services/image-list.service';
import { imageItem } from 'app/5.models/imageItem';
import { Collections } from 'app/5.models/collection';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.css'],
})
export class CollectionPreviewComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawOpen: 'open' | 'close' = 'open';
  collectionGroup: FormGroup;

  @Input() collection: Collections;
  Title = '';
  Description = '';
  imageListService = inject(ImageListService);
  fb = inject(FormBuilder);

  collectionsImages: imageItem[] = [];
  subCollections: any;
  item: imageItem = null;
  id: string;

  constructor() {}

  ngOnInit(): void {
    this.Title = this.collection.title;
    this.Description = this.collection.body;
    this.createEmptyForm();
    this.Refresh(this.collection.id);
  }

  onUpdate(imgItem: imageItem) {
    this.imageListService.updateCollectionDescription(
      imgItem.id,
      imgItem.imageAlt
    );
  }

  createEmptyForm() {
    this.collectionGroup = this.fb.group({
      URL: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  Refresh(id: string) {
    this.subCollections = this.imageListService
      .getImagesByType(id)
      .subscribe((item) => {
        this.collectionsImages = item;
      });
  }

  EditTitle(id: string) {
    let item = this.collectionsImages.find((x) => x.id === id);
    if (item !== undefined || item !== null) {
      console.debug('EditTitle', id);
      this.id = id;
      this.createForm(item);
    } else {
      this.createForm(null);
    }
    this.openDrawer();
  }

  ngOnDestroy(): void {
    this.subCollections.unsubscribe();
  }

  UpdateDescription(desc: string) {
    let item = this.collectionsImages.find((x) => x.id === this.id);
    if (item !== undefined || item !== null) {
      console.debug('UpdateDescription', desc);
      item.imageAlt = desc;
      this.imageListService.updateCollectionDescription(item.id, desc);
    }
  }

  createForm(item: imageItem) {
    if (item !== undefined || item !== null) {
      this.collectionGroup = this.fb.group({
        URL: [item.imageSrc, Validators.required],
        Description: [item.description, Validators.required],
      });
    } else {
      this.collectionGroup = this.fb.group({
        URL: ['', Validators.required],
        Description: ['', Validators.required],
      });
    }
  }

  openDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  closeDrawer() {
    const opened = this.drawer.opened;
    if (opened === true) {
      this.drawer.toggle();
    } else {
      return;
    }
  }

  toggleDrawer() {
    const opened = this.drawer.opened;
    if (opened !== true) {
      this.drawer.toggle();
    } else {
      if (this.drawOpen === 'close') {
        this.drawer.toggle();
      }
    }
  }
}
