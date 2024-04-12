import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingMap: { [key: string]: { loading: boolean; text: string } } =
    {};

  constructor() {
    this.loadingMap = {};
  }

  setLoadingState(
    key: string,
    loading: boolean,
    text: string = 'Loading...'
  ): void {
    this.loadingMap[key] = { loading, text };
  }

  isLoading(key: string): boolean {
    return this.loadingMap[key]?.loading || false;
  }

  getLoadingText(key: string): string {
    return this.loadingMap[key]?.text || 'Loading...';
  }
}
