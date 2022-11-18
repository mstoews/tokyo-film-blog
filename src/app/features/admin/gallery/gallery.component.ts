import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IImageStorage } from 'app/models/maintenance';

interface Item {
  imageSrc: string;
  imageAlt: string;
}


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  inventoryImages: Item[] = [];
  constructor(public storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.ImagesList();
  }

  ImagesList() {
    var imageCount = 0;
    this.storage
      .ref('/')
      .listAll()
      .subscribe((files) => {

        files.items.forEach((imageRef) => {
          imageCount++;
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: Item = {
              imageSrc: imageUrl,
              imageAlt: imageCount.toString(),
            };
            this.inventoryImages.push(imageData);
          });
        });
      });
  }
}

