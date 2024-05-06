import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';

@Injectable({ providedIn: 'root' })
export class ProfileLoaderService {
  private key = 'profile';

  constructor(private loaderService: LoaderService) {}

  get profileBeingUpdated(): boolean {
    return this.loaderService.isLoading(this.key);
  }

  set profileBeingUpdated(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, '');
  }
}
