import { TestBed } from '@angular/core/testing';

import { ApilayerService } from './apilayer.service';

describe('ApilayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApilayerService = TestBed.get(ApilayerService);
    expect(service).toBeTruthy();
  });
});
