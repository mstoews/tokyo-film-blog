import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Product } from 'app/5.models/products';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { imageItemIndex } from 'app/5.models/imageItem';
import { ImageItemIndexService } from 'app/4.services/image-item-index.service';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCardComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  image$: Observable<imageItemIndex[]>;

  constructor(
    private router: Router,
    private imageItemIndexService: ImageItemIndexService
  ) {}

  ngOnInit(): void {
    this.image$ = this.imageItemIndexService.getAllImages(this.product.id);
  }

  openProductDetail() {
    this.router.navigate(['shop/product', this.product.id]);
  }

  ngOnDestroy(): void {

  }

}
