import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '~env/environment';
@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}

  setPage(): void {}

  setTheme(theme?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('class', theme);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('class', 'light');
      }
    }
  }

  setLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId) && environment.production) {
      switch (language) {
        case 'en':
          if (!window.location.href.includes('/en')) {
            window.location.href = '/en';
          }
          break;
        case 'tr':
          if (!window.location.href.includes('/tr')) {
            window.location.href = '/tr';
          }
          break;
        default:
          break;
      }
    }
  }
}
