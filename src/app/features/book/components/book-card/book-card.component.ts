import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { BookService } from '../../services/book.service';
import { AuthService } from '~app/core/services/auth/auth.service';
import {
  iconoirFavouriteBook,
  iconoirShareAndroid,
  iconoirCopy,
  iconoirHeart,
} from '@ng-icons/iconoir';
import { ionHeart, ionHeartOutline } from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { BookLoaderService } from '~app/core/services/loading/book-loader/book-loader.service';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';
import { BookStatusPipe } from '../../pipes/book-status.pipe';
import { RouterModule } from '@angular/router';
import { FavoriteBook, MemberResponse } from '~app/models/HttpResponse/MemberResponse';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    SpinnerComponent,
    BookStatusPipe,
    RouterModule,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  viewProviders: [
    provideIcons({
      iconoirShareAndroid,
      iconoirFavouriteBook,
      iconoirCopy,
      iconoirHeart,
      ionHeart,
      ionHeartOutline,
    }),
  ],
  providers: [BookStatusPipe],
})
export class BookCardComponent implements OnInit {
  @Input() book!: BookListResponse;
  protected bookReservingLoaderText!: string;
  protected member!: MemberResponse;
  constructor(
    private authService: AuthService,
    private bookService: BookService,
    protected bookLoaderService: BookLoaderService,
    protected bookStatusPipe: BookStatusPipe,
    private toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.bookReservingLoaderText = '';
    this.authService.userSubject.subscribe((user) => {
      this.bookService.favoriteBooksSubject.next(user?.favoriteBooks);
      this.bookService.reservedBookSubject.next(user?.reservations);
    });
    this.authService.userSubject.subscribe((member) => {
      this.member = member;
    });
  }

  checkIfBookReserved(bookId: string): boolean {
    return (
      this.bookService.reservedBookSubject.value as unknown as any[]
    ).some((book: any) => book.bookId === bookId);
  }

  reserve(bookId: string): void {
    this.bookLoaderService.bookBeingReserved = true;
    this.bookService
      .reserve(bookId, this.authService.userSubject.value.id)
      .subscribe({
        next: () => {
          this.authService.refreshuserSubject();
          this.bookLoaderService.bookBeingReserved = false;
          this.toasterService.success(
            'Book reserved successfully',
            this.book.bookTitle
          );
        },
        error: (error) => {
          this.bookLoaderService.bookBeingReserved = false;
          this.toasterService.error('Error reserving book', error);
        },
      });
  }

  unreserve(bookId: string): void {
    const reservation = this.authService.userSubject.value?.reservations.filter(
      (reservation: any) => reservation.bookId === bookId
    )[0];
    console.log(reservation);

    this.bookLoaderService.bookBeingReserved = true;
    this.bookService.unreserve(reservation.id).subscribe({
      next: () => {
        this.authService.refreshuserSubject();
        this.bookLoaderService.bookBeingReserved = false;
        this.toasterService.success(
          'Book unreserved successfully',
          this.book.bookTitle
        );
      },
      error: (error) => {
        this.bookLoaderService.bookBeingReserved = false;
        this.toasterService.error('Error unreserving book', error);
      },
    });
  }

  favorite(bookId: string): void {
    this.bookService
      .favorite(bookId, this.authService.userSubject.value.id)
      .subscribe({
        next: () => {
          this.authService.refreshuserSubject();
          this.toasterService.success(
            'Book favorited successfully',
            this.book.bookTitle
          );
        },
        error: (error) => {
          this.toasterService.error('Error favoriting book', error);
        },
      });
  }

  unfavorite(bookId: string): void {
    const favoriteBookId =
      this.authService.userSubject.value?.favoriteBooks.filter(
        (book: any) => book.bookId === bookId
      )[0]?.id;
    this.bookService.unfavorite(favoriteBookId).subscribe({
      next: () => {
        this.authService.refreshuserSubject();
        this.toasterService.success(
          'Book unfavorited successfully',
          this.book.bookTitle
        );
      },
      error: (error) => {
        this.toasterService.error('Error unfavoriting book', error);
      },
    });
  }

  checkIfBookFavorited(bookId: string): boolean {
    return (
      this.bookService.favoriteBooksSubject.value as unknown as FavoriteBook[]
    ).some((book: any) => book.bookId === bookId);
  }

  copyText(isbn: string): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard
        .writeText(isbn)
        .then(() => {
          this.toasterService.success('Copied to clipboard', isbn);
        })
        .catch((error) => {
          this.toasterService.error('Error copying to clipboard', error);
        });
    }
  }
}
