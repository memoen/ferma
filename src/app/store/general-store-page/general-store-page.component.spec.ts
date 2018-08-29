import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStorePageComponent } from './general-store-page.component';

describe('GeneralStorePageComponent', () => {
  let component: GeneralStorePageComponent;
  let fixture: ComponentFixture<GeneralStorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
