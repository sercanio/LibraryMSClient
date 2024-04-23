import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';

@Injectable({ providedIn: 'root' })
export class BookLoaderService {
  private key = 'book';

  constructor(private loaderService: LoaderService) {}

  get bookBeingReserved(): boolean {
    return this.loaderService.isLoading(this.key);
  }

  set bookBeingReserved(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, '');
  }
}
