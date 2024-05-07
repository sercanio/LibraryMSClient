import { TestBed } from '@angular/core/testing';

import { SearchLoaderService } from './search-loader.service';

describe('SearchLoaderService', () => {
  let service: SearchLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
