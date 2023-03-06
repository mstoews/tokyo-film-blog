import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { IImageStorage } from 'app/models/maintenance';
import SwiperCore, { SwiperOptions, Navigation } from 'swiper';
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-swiper',
  templateUrl: './image-swipe-content.component.html',
  styleUrls: ['./image-swipe-content.component.css']
})
export class ImageSwipeComponent implements OnInit {

  imagesArray: IImageStorage[] = [];
  constructor(
    public storage: AngularFireStorage,
    private route: Router,
    ) { }

  config: SwiperOptions = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
      slidesPerView: "auto",
      spaceBetween: 24,
      },
      // when window width is >= 480px
      480: {
      slidesPerView: "auto",
      spaceBetween: 24,
      },
      // when window width is >= 640px
      640: {
      slidesPerView: "auto",
      spaceBetween: 24,
      },
      1024: {
          slidesPerView: "auto",
      spaceBetween: 32,
      },
      1336: {
      slidesPerView: 3,
      spaceBetween: 32
      }
  },
    loop: false
  };


  ngOnInit(): void {
    this.ImagesList();
  }

  onGotoShop() {
    console.log('open the shop');
    this.route.navigateByUrl('/shop')
  }

  ImagesList() {
    var imageCount = 0;
    this.storage
      .ref('/thumbnails')
      .listAll()
      .subscribe((files) => {
        files.items.forEach((imageRef) => {
          imageCount++;
          imageRef.getDownloadURL().then((downloadURL) => {
            const imageUrl = downloadURL;
            const imageData: IImageStorage = {
              name: 'image' ,
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
