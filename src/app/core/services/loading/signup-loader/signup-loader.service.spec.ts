import { TestBed } from '@angular/core/testing';

import { SignupLoadingService } from './signup-loader.service';

describe('SignupLoadingService', () => {
  let service: SignupLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
