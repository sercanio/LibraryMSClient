import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CopyToClipboardDirective } from '~app/shared/directives/copy/copy-to-clipboard';
import { iconoirCopy } from '@ng-icons/iconoir';
import {
  BookAuthor,
  BookLocation,
  BookResponse,
} from '~app/models/HttpResponse/BookResspone';
import { BookService } from '~app/features/book/services/book.service';
import { BookStatusPipe } from '~app/features/book/pipes/book-status.pipe';
import { BookStatus, BookStatusEnum } from '~app/models/BookStatus';
import { AuthService } from '~app/core/services/auth/auth.service';
import { BookLoaderService } from '~app/core/services/loading/book-loader/book-loader.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { iconoirHeart } from '@ng-icons/iconoir';
import { ionHeartOutline } from '@ng-icons/ionicons';

@Component({
  standalone: true,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
    CopyToClipboardDirective,
    BookStatusPipe,
    SpinnerComponent,
  ],
  viewProviders: [
    provideIcons({
      iconoirCopy,
      iconoirHeart,
      ionHeartOutline,
    }),
  ],
  providers: [BookStatusPipe],
})
export class BookDetailComponent implements OnInit {
  book!: BookResponse;
  bookId!: string;
  bookTitle!: string;
  bookEdition!: number;
  releaseDate!: number;
  pageCount!: number;
  status!: BookStatus;
  categoryName!: string;
  publisherName!: string;
  location!: BookLocation;
  authors!: BookAuthor[];
  isbnCode!: string;
  imageUrl!: string;

  bookReservingLoaderText = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    @Inject(PLATFORM_ID) private platformId: Object,
    protected bookStatusPipe: BookStatusPipe,
    private authService: AuthService,
    protected bookLoaderService: BookLoaderService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.params.subscribe((params) => {
        this.bookId = params['id'];
        this.loadbookDetails(this.bookId);
      });
    }
    this.bookReservingLoaderText = '';
    this.authService.userSubject.subscribe((user) => {
      this.bookService.favoriteBooksSubject.next(user?.favoriteBooks);
    });
  }

  loadbookDetails(ebookId: string) {
    this.bookService.getById(ebookId).subscribe((response: BookResponse) => {
      if (response) {
        this.book = response;
        this.bookId = response.id;
        this.bookTitle = response.bookTitle;
        this.bookEdition = response.bookEdition;
        this.releaseDate = response.releaseDate;
        this.pageCount = response.pageCount;
        this.status = response.status;
        this.categoryName = response.categoryName;
        this.publisherName = response.publisherName;
        this.location = response.location;
        this.authors = response.authors;
        this.isbnCode = response.isbnCode;
        this.imageUrl = response.imageUrl;
      }
    });
  }

  reserve(bookId: string): void {
    this.bookLoaderService.bookBeingReserved = true;
    this.bookService
      .reserve(bookId, this.authService.userSubject.value.id)
      .subscribe({
        next: () => {
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
    let isBookFavorited = false;
    this.bookService.favoriteBooksSubject.subscribe((favoriteBooks) => {
      if (favoriteBooks) {
        isBookFavorited = (favoriteBooks as any[]).some(
          (book: any) => book.bookId === bookId
        );
      }
    });
    return isBookFavorited;
  }
}
