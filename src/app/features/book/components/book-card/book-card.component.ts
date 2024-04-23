import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { BookService } from '../../services/book.service';
import { AuthService } from '~app/core/services/auth/auth.service';
import {
  iconoirFavouriteBook,
  iconoirShareAndroid,
  iconoirCopy,
} from '@ng-icons/iconoir';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { BookLoaderService } from '~app/core/services/loading/book-loader/book-loader.service';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, SpinnerComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  viewProviders: [
    provideIcons({ iconoirShareAndroid, iconoirFavouriteBook, iconoirCopy }),
  ],
})
export class BookCardComponent {
  @Input() book!: BookListResponse;
  clipboardValue: string = '';
  bookReservingLoaderText! : string;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    protected bookLoaderService: BookLoaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.bookReservingLoaderText = '';
  }

  reserve(bookId: string): void {
    this.bookLoaderService.bookBeingReserved = true;
    this.bookService
      .reserve(bookId, this.authService.userSubject.value.id)
      .subscribe({
        next: () => {
          this.bookLoaderService.bookBeingReserved = false;
          
        },
        error: (error) => {
          this.bookLoaderService.bookBeingReserved = false;
          console.error('Error reserving book', error);
        },
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
