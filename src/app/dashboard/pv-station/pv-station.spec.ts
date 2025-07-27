import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvStation } from './pv-station';

describe('PvStation', () => {
  let component: PvStation;
  let fixture: ComponentFixture<PvStation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PvStation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvStation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
