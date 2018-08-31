import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorySqComponent } from './factory-sq.component';

describe('FactorySqComponent', () => {
  let component: FactorySqComponent;
  let fixture: ComponentFixture<FactorySqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorySqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorySqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
