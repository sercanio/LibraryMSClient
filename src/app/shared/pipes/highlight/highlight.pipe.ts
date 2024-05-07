import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlight', standalone: true })
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, searchParam: string): SafeHtml {
    if (!searchParam || !value) {
      return value;
    }

    const re = new RegExp(searchParam, 'gi');
    const match = value.match(re);
    if (!match) {
      return value;
    }

    const highlightedValue = value.replace(
      re,
      (match) => `<span class="highlight">${match}</span>`
    );
    
    return this.sanitizer.bypassSecurityTrustHtml(highlightedValue);
  }
}
