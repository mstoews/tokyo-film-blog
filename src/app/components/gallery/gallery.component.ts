import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { imageItem } from 'app/models/imageItem'


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() public topCollection: imageItem[] = [];
  @Input() public bottomCollection: imageItem[] = [];

  ngOnInit(): void {
    // this.topCollection = [];
    // for (var i=0; i < 3; i++)
    //   this.topCollection.push(this.bottomCollection[i+6]);
   }

  public onPreviewImage(index: number) {
    // const image = this.inventoryImages[index].imageSrc;
    // console.log(`Preview image ${image}`);
  }
}
