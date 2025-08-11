import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHead } from './weather-head';

describe('WeatherHead', () => {
  let component: WeatherHead;
  let fixture: ComponentFixture<WeatherHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
