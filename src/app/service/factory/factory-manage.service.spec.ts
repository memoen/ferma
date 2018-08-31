import { TestBed, inject } from '@angular/core/testing';

import { FactoryManageService } from './factory-manage.service';

describe('FactoryManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactoryManageService]
    });
  });

  it('should be created', inject([FactoryManageService], (service: FactoryManageService) => {
    expect(service).toBeTruthy();
  }));
});
