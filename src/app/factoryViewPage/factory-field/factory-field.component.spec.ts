import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryFieldComponent } from './factory-field.component';

describe('FactoryFieldComponent', () => {
  let component: FactoryFieldComponent;
  let fixture: ComponentFixture<FactoryFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
