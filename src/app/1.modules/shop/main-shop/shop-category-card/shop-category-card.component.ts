import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'app/5.models/category';


@Component({
  selector: 'shop-category-card',
  templateUrl: './shop-category-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCategoryCardComponent {

  mobile: boolean = false;

  @Input() category: Category
  @Output() private notifyCategoryRefresh: EventEmitter<any> = new EventEmitter()

  onRefreshName(category: string) {
    this.notifyCategoryRefresh.emit(category)
  }

  ngOnInit() {
    if (window.screen.width <= 1200) { // 768px portrait
      this.mobile = true;
    }
    else
    {
      this.mobile = false;
    }
  }

}
