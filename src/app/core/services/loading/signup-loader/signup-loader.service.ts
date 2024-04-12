import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';
@Injectable({ providedIn: 'root' })
export class SignupLoaderService {
  private key = 'signup';

  constructor(private loaderService: LoaderService) {}

  set signupLoading(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, 'Signing up...');
  }
}
