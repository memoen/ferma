import { TestBed, inject } from '@angular/core/testing';

import { VieldViewStateService } from './vield-view-state.service';

describe('VieldViewStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VieldViewStateService]
    });
  });

  it('should be created', inject([VieldViewStateService], (service: VieldViewStateService) => {
    expect(service).toBeTruthy();
  }));
});
