import { TestBed, inject } from '@angular/core/testing';

import { FinalSaveService } from './final-save.service';

describe('FinalSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalSaveService]
    });
  });

  it('should be created', inject([FinalSaveService], (service: FinalSaveService) => {
    expect(service).toBeTruthy();
  }));
});
