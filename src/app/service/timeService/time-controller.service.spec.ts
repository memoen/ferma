import { TestBed, inject } from '@angular/core/testing';

import { TimeControllerService } from './time-controller.service';

describe('TimeControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeControllerService]
    });
  });

  it('should be created', inject([TimeControllerService], (service: TimeControllerService) => {
    expect(service).toBeTruthy();
  }));
});
