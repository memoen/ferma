import { TestBed, inject } from '@angular/core/testing';

import { CellInfoService } from './cell-info.service';

describe('CellInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CellInfoService]
    });
  });

  it('should be created', inject([CellInfoService], (service: CellInfoService) => {
    expect(service).toBeTruthy();
  }));
});
