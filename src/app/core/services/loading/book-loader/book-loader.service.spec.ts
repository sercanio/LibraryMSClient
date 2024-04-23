import { TestBed } from '@angular/core/testing';

import { BookLoaderService } from './book-loader.service';

describe('BookLoaderService', () => {
  let service: BookLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
