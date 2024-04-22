import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { BookService } from '../../services/book.service';
import { AuthService } from '~app/core/services/auth/auth.service';
import { iconoirFavouriteBook, iconoirShareAndroid, iconoirCopy } from '@ng-icons/iconoir';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  viewProviders: [provideIcons({ iconoirShareAndroid, iconoirFavouriteBook, iconoirCopy })],
})
export class BookCardComponent {
  @Input() book!: BookListResponse;
  clipboardValue = 'asd';

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  reserve(bookId: string): void {
    this.bookService
      .reserve(bookId, this.authService.userSubject.value.id)
      .subscribe((response) => {
        console.log('Book reserved successfully' + response);
      });
  }

  copyText(isbn: string): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard
        .writeText(isbn)
        .then(() => {
          console.log('Copied to clipboard', isbn);
        })
        .catch((error) => {
          console.error('Error copying to clipboard', error);
        });
    }
  }
}
