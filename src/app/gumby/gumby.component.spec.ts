import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GumbyComponent } from './gumby.component';

describe('GumbyComponent', () => {
  let component: GumbyComponent;
  let fixture: ComponentFixture<GumbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GumbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GumbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
