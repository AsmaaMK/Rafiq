import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityHeaderComponent } from './city-header.component';

describe('CityHeaderComponent', () => {
  let component: CityHeaderComponent;
  let fixture: ComponentFixture<CityHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
