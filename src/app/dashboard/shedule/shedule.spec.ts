import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shedule } from './shedule';

describe('Shedule', () => {
  let component: Shedule;
  let fixture: ComponentFixture<Shedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
