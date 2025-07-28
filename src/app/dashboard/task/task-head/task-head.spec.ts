import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHead } from './task-head';

describe('TaskHead', () => {
  let component: TaskHead;
  let fixture: ComponentFixture<TaskHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
