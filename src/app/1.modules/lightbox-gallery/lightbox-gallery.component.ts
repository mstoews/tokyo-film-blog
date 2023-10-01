import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from '../lightbox/'
import { Subscription } from 'rxjs';
import { ImageItemIndex } from 'app/5.models/imageItem';

@Component({
  selector: 'app-lightbox-gallery',
  standalone: true,
  imports: [CommonModule],
  providers: [Lightbox, LightboxEvent, LightboxConfig],
  templateUrl: './lightbox-gallery.component.html',
  styleUrls: ['./lightbox-gallery.component.css']
})
export class LightboxGalleryComponent implements OnInit {
  public albums: Array<IAlbum>;
  private _subscription: Subscription;
  @Input() galleryData: ImageItemIndex[] = [];

  constructor(
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig
  ) {

  }
  ngOnInit(): void {

    if (this.galleryData.length > 0) {
      this.albums = [];
      for (let i = 0; i < this.galleryData.length; i++) {
        const src = this.galleryData[i].imageSrc800;
        const caption = this.galleryData[i].imageAlt;
        const thumb = this.galleryData[i].imageSrc200;
        const album = {
           src: src,
           caption: caption,
           thumb: thumb
        };

        this.albums.push(album);
      }
      this._lighboxConfig.fadeDuration = 1;
    }

  }

  open(index: any): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, index, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: true,
      showZoom: true,
      showRotate: true,
      showDownloadButton: true
    });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
}
