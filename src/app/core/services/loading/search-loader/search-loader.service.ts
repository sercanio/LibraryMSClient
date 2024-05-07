import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';

@Injectable({ providedIn: 'root' })
export class SearchLoaderService {
  private key = 'search';

  constructor(private loaderService: LoaderService) {}

  get searchBeingUpdated(): boolean {
    return this.loaderService.isLoading(this.key);
  }

  set searchBeingUpdated(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, '');
  }
}
