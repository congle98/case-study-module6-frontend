import { TestBed } from '@angular/core/testing';

import { ProviderHomeService } from './provider-home.service';

describe('ProviderHomeService', () => {
  let service: ProviderHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
