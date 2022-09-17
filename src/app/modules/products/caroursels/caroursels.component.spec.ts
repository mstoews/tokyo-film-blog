import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarourselsComponent } from './caroursels.component';

describe('CarourselsComponent', () => {
  let component: CarourselsComponent;
  let fixture: ComponentFixture<CarourselsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarourselsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarourselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
