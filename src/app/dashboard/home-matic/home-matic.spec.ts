import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMatic } from './home-matic';

describe('HomeMatic', () => {
  let component: HomeMatic;
  let fixture: ComponentFixture<HomeMatic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMatic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMatic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
