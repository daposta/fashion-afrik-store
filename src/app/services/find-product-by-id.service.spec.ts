import { TestBed, inject } from '@angular/core/testing';

import { FindProductByIdService } from './find-product-by-id.service';

describe('FindProductByIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindProductByIdService]
    });
  });

  it('should be created', inject([FindProductByIdService], (service: FindProductByIdService) => {
    expect(service).toBeTruthy();
  }));
});
