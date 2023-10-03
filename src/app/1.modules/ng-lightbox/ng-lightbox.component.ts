import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, shareReplay } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LIGHTBOX_CONFIG, LightboxModule } from 'ng-gallery/lightbox';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { NoteComponent } from '../shared/note/note.component';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { HeadingModule } from 'app/2.main/header/heading.module';

@Component({
  host: {
    class: 'page',
  },
  selector: 'lightbox-example',
  templateUrl: './ng-lightbox.component.html',
  styleUrls: ['./ng-lightbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
      },
    },
  ],
  imports: [
    CommonModule,
    LightboxModule,
    SectionTitleComponent,
    NoteComponent,
    MatButtonModule,
    RouterLink,
    FontAwesomeModule,
    FooterComponent,
    HeadingModule,
  ],
})
export class NgLightboxComponent implements OnInit, OnDestroy {

  space$: Observable<GalleryItem[]>;
  images: string[] = [];

  constructor(
    public gallery: Gallery,
    public lightbox: Lightbox,
    private _title: Title,
    private _imageItemIndexService: ImageItemIndexService
  )
  {
  }

  galleryImages: ImageItem[] = [];

  imageItems(category: string) {
    return this._imageItemIndexService.getImagesByCategory(category).pipe(
      map((data) => {
        return data.map((item) => {
          return new ImageItem({ src: item.imageSrc800, thumb: item.imageSrc200, alt: item.fileName });
        });
      })
    );
  }

  ngOnInit() {


    this.space$ = this.imageItems('IN_NOT_USED').pipe(
      map((items: GalleryItem[]) => {
        // Load items manually into the lightbox gallery ref
        this.gallery
          .ref('lightbox', {
            thumbPosition: 'top',
            imageSize: 'cover',
            autoHeight: false,
          })
          .load(items);
        return items;
      })
    );
  }

  ngOnDestroy() {
    this.gallery.ref('lightbox').destroy();
  }
}
