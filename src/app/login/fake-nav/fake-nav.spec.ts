import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeNav } from './fake-nav';

describe('FakeNav', () => {
  let component: FakeNav;
  let fixture: ComponentFixture<FakeNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
