import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPageViewComponent } from './market-page-view.component';

describe('MarketPageViewComponent', () => {
  let component: MarketPageViewComponent;
  let fixture: ComponentFixture<MarketPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
