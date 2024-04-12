import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';

@Injectable({ providedIn: 'root' })
export class LoginLoaderService {
  private key = 'login';

  constructor(private loaderService: LoaderService) {}

  get logInLoading(): boolean {
    return this.loaderService.isLoading(this.key);
  }

  set logInLoading(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, 'Logging in...');
  }
}
