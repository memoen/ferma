import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFieldViewComponent } from './page-field-view.component';

describe('PageFieldViewComponent', () => {
  let component: PageFieldViewComponent;
  let fixture: ComponentFixture<PageFieldViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFieldViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFieldViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
