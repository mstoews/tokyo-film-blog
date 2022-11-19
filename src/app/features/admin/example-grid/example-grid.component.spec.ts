import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGridComponent } from './example-grid.component';

describe('ExampleGridComponent', () => {
  let component: ExampleGridComponent;
  let fixture: ComponentFixture<ExampleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
