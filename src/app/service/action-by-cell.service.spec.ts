import { TestBed, inject } from '@angular/core/testing';

import { ActionByCellService } from './action-by-cell.service';

describe('ActionByCellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionByCellService]
    });
  });

  it('should be created', inject([ActionByCellService], (service: ActionByCellService) => {
    expect(service).toBeTruthy();
  }));
});
