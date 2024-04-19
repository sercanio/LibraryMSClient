import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  locale: string;

  constructor(
    @Inject('localeParam') localeParam: string,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.locale = localeParam;
    this.titleService = titleService;
    this.metaService = metaService;
    this.setPage();
  }

  setPage(): void {
    console.log('Locale:', this.locale);

    if (this.locale === 'tr-TR') {
      this.titleService.setTitle('Tobeto Halk Kütüphanesi - Anasayfa');
      this.metaService.addTags([
        {
          name: 'description',
          content: "Tobeto Halk Kütüphanesi'ne Hoşgeldiniz",
        },
        { name: 'author', content: 'Tobeto' },
      ]);
    } else {
      this.titleService.setTitle('Tobeto Public Library - Home');
      this.metaService.addTags([
        {
          name: 'description',
          content: 'Welcome to the Tobeto Public Library',
        },
        { name: 'author', content: 'Tobeto' },
      ]);
    }
  }
}
