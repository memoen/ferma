import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMenuComponent } from './sell-menu.component';

describe('SellMenuComponent', () => {
  let component: SellMenuComponent;
  let fixture: ComponentFixture<SellMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
