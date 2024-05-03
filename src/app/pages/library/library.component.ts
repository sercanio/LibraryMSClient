import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BookCardComponent } from '~app/features/book/components/book-card/book-card.component';
import { BookService } from '~app/features/book/services/book.service';
import { MagazineCardComponent } from '~app/features/magazine/components/magazine-card/magazine-card.component';
import { MagazineService } from '~app/features/magazine/services/magazine.service';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { MagazineListResponse } from '~app/models/HttpResponse/MagazineListResponse';

@Component({
  standalone: true,
  imports: [CommonModule, BookCardComponent, MagazineCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  protected bookListObj!: Collection<BookListResponse>;
  protected bookListItems!: BookListResponse[];
  protected magazineListObj!: Collection<MagazineListResponse>;
  protected magazineListItems!: MagazineListResponse[];

  constructor(
    private bookService: BookService,
    private magazineService: MagazineService
  ) {}

  ngOnInit() {
    this.getBookListItems();
  }

  getBookListItems() {
    this.bookService.getAll().subscribe((response) => {
      this.bookListObj = response;
      this.bookListItems = response.items;
      this.magazineListItems = [];
    });
  }

  getBookListObj() {
    return this.bookListObj;
  }

  getBookListItemsLength() {
    return this.bookListItems.length;
  }

  getMagazineListItems() {
    this.magazineService.getAll().subscribe((response) => {
      this.magazineListObj = response;
      this.magazineListItems = response.items;
      this.bookListItems = [];
      console.log(this.magazineListItems);
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value === 'magazines') {
      this.getMagazineListItems();
    }
    if (value === 'books') {
      this.getBookListItems();
    }
  }
}
