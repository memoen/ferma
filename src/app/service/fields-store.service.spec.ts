import { TestBed, inject } from '@angular/core/testing';

import { FieldsStoreService } from './fields-store.service';

describe('FieldsStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldsStoreService]
    });
  });

  it('should be created', inject([FieldsStoreService], (service: FieldsStoreService) => {
    expect(service).toBeTruthy();
  }));
});
