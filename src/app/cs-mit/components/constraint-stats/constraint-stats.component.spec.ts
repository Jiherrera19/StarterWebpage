import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintStatsComponent } from './constraint-stats.component';

describe('ConstraintStatsComponent', () => {
  let component: ConstraintStatsComponent;
  let fixture: ComponentFixture<ConstraintStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstraintStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstraintStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
