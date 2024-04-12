import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupLoaderService {
  private loading: boolean = false;

  constructor() {}

  get signupLoading(): boolean {
    return this.loading;
  }

  set signupLoading(loading: boolean) {
    this.loading = loading;
  }
}
