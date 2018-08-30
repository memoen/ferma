import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceTimeComponent } from './force-time.component';

describe('ForceTimeComponent', () => {
  let component: ForceTimeComponent;
  let fixture: ComponentFixture<ForceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
