import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Collection } from '~app/core/models/Response/Collection';
import { BookCardComponent } from '~app/features/book/components/book-card/book-card.component';
import { BookService } from '~app/features/book/services/book.service';
import { EBookCardComponent } from '~app/features/e-book/e-book-card/e-book-card.component';
import { EBookService } from '~app/features/e-book/services/e-book.service';
import { MagazineCardComponent } from '~app/features/magazine/components/magazine-card/magazine-card.component';
import { MagazineService } from '~app/features/magazine/services/magazine.service';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { EBookListResponse } from '~app/models/HttpResponse/EbookListResponse';
import { MagazineListResponse } from '~app/models/HttpResponse/MagazineListResponse';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    MagazineCardComponent,
    EBookCardComponent,
    FormsModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  protected bookListObj!: Collection<BookListResponse>;
  protected bookListItems!: BookListResponse[];
  protected magazineListObj!: Collection<MagazineListResponse>;
  protected magazineListItems!: MagazineListResponse[];
  protected EBookListObj!: Collection<EBookListResponse>;
  protected eBookListItems!: EBookListResponse[];

  searchParam: string = '';
  listMode: string = 'books';

  bookListConfig = {
    initialIndex: 0,
    itemsPerPage: 4,
  };

  pageIndex: number = this.bookListConfig.initialIndex;
  pageSize: number = this.bookListConfig.itemsPerPage;
  currentPage: number = this.bookListConfig.initialIndex;
  isLastPage: boolean = false;
  isFirstPage: boolean = false;
  showPageList: boolean = false;
  totalPages: number[] = [];

  constructor(
    private bookService: BookService,
    private magazineService: MagazineService,
    private EBookService: EBookService
  ) {}

  ngOnInit() {
    this.getBookListItems();
  }

  getBookListItems(
    pageIndex: number = this.pageIndex,
    pageSize: number = this.pageSize
  ) {
    this.bookService.getAll(pageIndex, pageSize).subscribe((response) => {
      this.bookListObj = response;
      this.bookListItems = response.items;
      this.currentPage = response.index;
      this.isLastPage = !response.hasNext;
      this.isFirstPage = !response.hasPrevious;
      this.magazineListItems = [];
      this.eBookListItems = [];
      this.totalPages = Array.from(
        { length: response.count / this.pageSize },
        (_, i) => i + 1
      );
    });
  }

  getMagazineListItems(
    pageIndex: number = this.pageIndex,
    pageSize: number = this.pageSize
  ) {
    this.magazineService.getAll(pageIndex, pageSize).subscribe((response) => {
      this.magazineListObj = response;
      this.magazineListItems = response.items;
      this.currentPage = response.index;
      this.isLastPage = !response.hasNext;
      this.isFirstPage = !response.hasPrevious;
      this.bookListItems = [];
      this.eBookListItems = [];
      this.totalPages = Array.from(
        { length: response.count / this.pageSize },
        (_, i) => i + 1
      );
    });
  }

  getEBookListItems(
    pageIndex: number = this.pageIndex,
    pageSize: number = this.pageSize
  ) {
    this.EBookService.getAll(pageIndex, pageSize).subscribe((response) => {
      this.EBookListObj = response;
      this.eBookListItems = response.items;
      this.currentPage = response.index;
      this.isLastPage = !response.hasNext;
      this.isFirstPage = !response.hasPrevious;
      this.bookListItems = [];
      this.magazineListItems = [];
      this.totalPages = Array.from(
        { length: response.count / this.pageSize },
        (_, i) => i + 1
      );
    });
  }

  onListModeChange(event: Event) {
    this.pageIndex = 0;
    const target = event.target as HTMLSelectElement;
    this.listMode = target.value;
    if (this.listMode === 'magazines') {
      this.getMagazineListItems(this.pageIndex, this.pageSize);
    }
    if (this.listMode === 'books') {
      this.getBookListItems(this.pageIndex, this.pageSize);
    }
    if (this.listMode === 'ebook') {
      this.getEBookListItems(this.pageIndex, this.pageSize);
    }
  }

  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.listMode === 'books') {
      this.searchBookListItems(target.value);
      console.log(this.bookListItems);
    }
  }

  onNextPage(): void {
    if (!this.isLastPage) {
      this.pageIndex++;
      if (this.listMode === 'books') {
        this.getBookListItems(this.pageIndex, this.pageSize);
      }
      if (this.listMode === 'magazines') {
        this.getMagazineListItems(this.pageIndex, this.pageSize);
      }
      if (this.listMode === 'ebook') {
        this.getEBookListItems(this.pageIndex, this.pageSize);
      }
    }
  }

  onPreviousPage(): void {
    if (!this.isFirstPage) {
      this.pageIndex--;
      if (this.listMode === 'books') {
        this.getBookListItems(this.pageIndex, this.pageSize);
      }
      if (this.listMode === 'magazines') {
        this.getMagazineListItems(this.pageIndex, this.pageSize);
      }
      if (this.listMode === 'ebook') {
        this.getEBookListItems(this.pageIndex, this.pageSize);
      }
    }
  }

  goToPage(event: Event) {
    const page = +(event.target as HTMLButtonElement).value;
    if (page !== this.currentPage + 1) {
      this.pageIndex = page - 1;
      if (this.listMode === 'books') {
        this.getBookListItems(this.pageIndex, this.pageSize);
      } else if (this.listMode === 'magazines') {
        this.getMagazineListItems(this.pageIndex, this.pageSize);
      } else if (this.listMode === 'ebook') {
        this.getEBookListItems(this.pageIndex, this.pageSize);
      }
    }
  }

  togglePageList() {
    this.showPageList = !this.showPageList;
  }

  searchBookListItems(searchTerm: string) {
    this.bookService
      .searchBooks('bookTitle', searchTerm)
      .subscribe((response) => {
        this.bookListObj = response;
        this.bookListItems = response.items;
      });
  }
}
