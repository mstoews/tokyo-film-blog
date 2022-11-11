import { Component, Input, OnInit, AfterContentInit} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem } from 'app/models/imageItem'


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements AfterContentInit {
  @Input() public topCollection: imageItem[] = [];
  @Input() public bottomCollection: imageItem[] = [];
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;

  ngAfterContentInit(): void {
    if (this.topCollection.length > 0) {
      this.image1 = this.topCollection[0].imageSrc;
      this.image2 = this.topCollection[1].imageSrc;
      this.image3 = this.topCollection[2].imageSrc;
    }

    if (this.bottomCollection.length > 0) {
      this.image4 = this.topCollection[0].imageSrc;
      this.image5 = this.topCollection[1].imageSrc;
      this.image6 = this.topCollection[2].imageSrc;
    }

   }

  public onPreviewImage(index: number) {

  }
}
