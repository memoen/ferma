import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryConsoleComponent } from './factory-console.component';

describe('FactoryConsoleComponent', () => {
  let component: FactoryConsoleComponent;
  let fixture: ComponentFixture<FactoryConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
