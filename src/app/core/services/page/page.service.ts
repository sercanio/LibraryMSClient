import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  setPage(): void {}

  setTheme(theme?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('theme', theme);
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }
}
