import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Collection } from '~app/core/models/Response/Collection';
import { BookCardComponent } from '~app/features/book/components/book-card/book-card.component';
import { BookService } from '~app/features/book/services/book.service';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';

@Component({
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  bookListObj!: Collection<BookListResponse>;
  bookListItems!: BookListResponse[];
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getAll().subscribe((response) => {
      this.bookListObj = response;
      this.bookListItems = response.items;
    });
  }

  reserveBook(bookId: string, memberId: string) {
    this.bookService.reserve(bookId, memberId).subscribe((response) => {
      console.log('Book reserved successfully' + response);
    });
  }
}
