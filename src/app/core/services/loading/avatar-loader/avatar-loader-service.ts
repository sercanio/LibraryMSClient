import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';

@Injectable({ providedIn: 'root' })
export class AvatarLoaderService {
  private key = 'avatar';

  constructor(private loaderService: LoaderService) {}

  get avatarBeingUpdated(): boolean {
    return this.loaderService.isLoading(this.key);
  }

  set avatarBeingUpdated(loading: boolean) {
    this.loaderService.setLoadingState(this.key, loading, '');
  }
}
