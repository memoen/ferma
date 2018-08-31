import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryViewPageComponent } from './factory-view-page.component';

describe('FactoryViewPageComponent', () => {
  let component: FactoryViewPageComponent;
  let fixture: ComponentFixture<FactoryViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
