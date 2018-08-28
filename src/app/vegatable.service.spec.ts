import { TestBed, inject } from '@angular/core/testing';

import { VegatableService } from './vegatable.service';

describe('VegatableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VegatableService]
    });
  });

  it('should be created', inject([VegatableService], (service: VegatableService) => {
    expect(service).toBeTruthy();
  }));
});
