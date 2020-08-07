import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsMitComponent } from './cs-mit.component';

describe('CsMitComponent', () => {
  let component: CsMitComponent;
  let fixture: ComponentFixture<CsMitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsMitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsMitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
