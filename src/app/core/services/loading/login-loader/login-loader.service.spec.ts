import { TestBed } from '@angular/core/testing';

import { LoginLoadingService } from './login-loader.service';

describe('LoginLoadingService', () => {
  let service: LoginLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
