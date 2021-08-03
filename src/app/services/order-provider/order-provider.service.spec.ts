import { TestBed } from '@angular/core/testing';

import { OrderProviderService } from './order-provider.service';

describe('OrderProviderService', () => {
  let service: OrderProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
