import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqCellComponent } from './sq-cell.component';

describe('SqCellComponent', () => {
  let component: SqCellComponent;
  let fixture: ComponentFixture<SqCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
