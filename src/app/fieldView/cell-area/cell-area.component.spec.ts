import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAreaComponent } from './cell-area.component';

describe('CellAreaComponent', () => {
  let component: CellAreaComponent;
  let fixture: ComponentFixture<CellAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
