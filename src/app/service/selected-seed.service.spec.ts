import { TestBed, inject } from '@angular/core/testing';

import { SelectedSeedService } from './selected-seed.service';

describe('SelectedSeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedSeedService]
    });
  });

  it('should be created', inject([SelectedSeedService], (service: SelectedSeedService) => {
    expect(service).toBeTruthy();
  }));
});
