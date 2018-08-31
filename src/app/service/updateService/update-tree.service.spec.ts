import { TestBed, inject } from '@angular/core/testing';

import { UpdateTreeService } from './update-tree.service';

describe('UpdateTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateTreeService]
    });
  });

  it('should be created', inject([UpdateTreeService], (service: UpdateTreeService) => {
    expect(service).toBeTruthy();
  }));
});
