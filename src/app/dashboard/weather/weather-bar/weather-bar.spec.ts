import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBar } from './weather-bar';

describe('WeatherBar', () => {
  let component: WeatherBar;
  let fixture: ComponentFixture<WeatherBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
