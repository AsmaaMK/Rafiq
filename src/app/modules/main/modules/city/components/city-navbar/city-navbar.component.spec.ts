import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityNavbarComponent } from './city-navbar.component';

describe('CityNavbarComponent', () => {
  let component: CityNavbarComponent;
  let fixture: ComponentFixture<CityNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
