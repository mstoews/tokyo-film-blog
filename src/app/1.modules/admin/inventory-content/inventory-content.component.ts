import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IImageStorage } from 'app/5.models/maintenance';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-inventory-content',
  templateUrl: './inventory-content.component.html',
  styleUrls: ['./inventory-content.component.css'],
})
export class InventoryContentComponent implements OnInit {
  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 32,
      },
      1336: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
    loop: false,
  };

  imagesArray: IImageStorage[] = [];
  constructor(public storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.ImagesList();
  }

  ImagesList() {
    var imageCount = 0;
    this.storage
      .ref('/800')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageCount++;
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: IImageStorage = {
              name: 'image',
              parentId: 'parent',
              url: imageUrl,
              version_no: imageCount,
            };
            this.imagesArray.push(imageData);
          });
        });
      });
  }
}
