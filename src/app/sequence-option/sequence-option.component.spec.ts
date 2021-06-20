import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceOptionComponent } from './sequence-option.component';

describe('SequenceOptionComponent', () => {
  let component: SequenceOptionComponent;
  let fixture: ComponentFixture<SequenceOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
