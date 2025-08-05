import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherContent } from './weather-content';

describe('WeatherContent', () => {
  let component: WeatherContent;
  let fixture: ComponentFixture<WeatherContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
