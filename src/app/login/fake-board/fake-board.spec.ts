import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeBoard } from './fake-board';

describe('FakeBoard', () => {
  let component: FakeBoard;
  let fixture: ComponentFixture<FakeBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
