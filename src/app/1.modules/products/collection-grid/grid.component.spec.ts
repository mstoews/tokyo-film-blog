import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGrid } from './grid.component';

describe('GridComponent', () => {
  let component: CollectionGrid;
  let fixture: ComponentFixture<CollectionGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
