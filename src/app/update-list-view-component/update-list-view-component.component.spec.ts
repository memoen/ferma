import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListViewComponentComponent } from './update-list-view-component.component';

describe('UpdateListViewComponentComponent', () => {
  let component: UpdateListViewComponentComponent;
  let fixture: ComponentFixture<UpdateListViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateListViewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateListViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
