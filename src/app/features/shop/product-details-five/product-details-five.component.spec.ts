import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsFiveComponent } from './product-details-five.component';

describe('ProductDetailsFiveComponent', () => {
  let component: ProductDetailsFiveComponent;
  let fixture: ComponentFixture<ProductDetailsFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsFiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
