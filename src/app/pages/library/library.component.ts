import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { Collection } from '~app/core/models/Response/Collection';
import { AuthService } from '~app/core/services/auth/auth.service';
import { SearchLoaderService } from '~app/core/services/loading/search-loader/search-loader.service';
import { BookCardComponent } from '~app/features/book/components/book-card/book-card.component';
import { BookService } from '~app/features/book/services/book.service';
import { EBookCardComponent } from '~app/features/e-book/e-book-card/e-book-card.component';
import { EBookService } from '~app/features/e-book/services/e-book.service';
import { FeedBackService } from '~app/features/feedback/feedback.service';
import { MagazineCardComponent } from '~app/features/magazine/components/magazine-card/magazine-card.component';
import { MagazineService } from '~app/features/magazine/services/magazine.service';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { EBookListResponse } from '~app/models/HttpResponse/EbookListResponse';
import { FineDueResponse } from '~app/models/HttpResponse/FineDueResponse';
import { MagazineListResponse } from '~app/models/HttpResponse/MagazineListResponse';
import { MemberResponse } from '~app/models/HttpResponse/MemberResponse';
import { SearchResultCollection } from '~app/models/SearchResultCollection';
import { SearchResultComponent } from '~app/shared/components/search-result/search-result.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    MagazineCardComponent,
    EBookCardComponent,
    SearchResultComponent,
    FormsModule,
    SpinnerComponent,
    RouterModule,
    ReactiveFormsModule,
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
  protected searchResultCollection!: SearchResultCollection;

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
  member!: MemberResponse;
  pages!: number;

  totalFineDue: number = 0;
  feedBackForm = this.formBuilder.group({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private bookService: BookService,
    private magazineService: MagazineService,
    private EBookService: EBookService,
    private searchLoaderService: SearchLoaderService,
    private formBuilder: FormBuilder,
    protected authService: AuthService,
    protected feedBackService: FeedBackService,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {
    this.getBookListItems();
    this.authService.userSubject.subscribe((member) => {
      this.member = member;
      this.totalFineDue = member.fineDues.reduce(
        (total: number, due: any) => total + due.fineTotal,
        0
      );
      console.log(this.totalFineDue);
    });
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
      this.totalPages = Array.from({ length: response.pages }, (_, i) => i + 1);
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
      this.totalPages = Array.from({ length: response.pages }, (_, i) => i + 1);
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
      this.totalPages = Array.from({ length: response.pages }, (_, i) => i + 1);
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

  searchBookListItems(searchTerm: string, changeList: boolean = false) {
    this.searchLoaderService.searchBeingUpdated = true;
    this.bookService
      .searchBooks('bookTitle', searchTerm)
      .subscribe((response) => {
        if (!changeList) {
          this.searchResultCollection = {
            ...this.searchResultCollection,
            bookListItems: response.items,
          };
        } else {
          this.bookListItems = response.items;
          this.magazineListItems = [];
          this.eBookListItems = [];
          this.pages = response.pages;
        }
        this.searchLoaderService.searchBeingUpdated = false;
      });
  }

  searchMagazineListItems(searchTerm: string, changeList: boolean = false) {
    this.searchLoaderService.searchBeingUpdated = true;
    this.magazineService
      .searchMagazines('magazineTitle', searchTerm)
      .subscribe((response) => {
        if (!changeList) {
          this.searchResultCollection = {
            ...this.searchResultCollection,
            magazineListItems: response.items,
          };
        } else {
          this.magazineListItems = response.items;
          this.bookListItems = [];
          this.eBookListItems = [];
          this.pages = response.pages;
        }
        this.searchLoaderService.searchBeingUpdated = false;
      });
  }

  searchEBookListItems(searchTerm: string, changeList: boolean = false) {
    this.searchLoaderService.searchBeingUpdated = true;
    this.EBookService.searchEBooks('eBookTitle', searchTerm).subscribe(
      (response) => {
        if (!changeList) {
          this.searchResultCollection = {
            ...this.searchResultCollection,
            eBookListItems: response.items,
          };
        } else {
          this.eBookListItems = response.items;
          this.bookListItems = [];
          this.magazineListItems = [];
          this.pages = response.pages;
        }
        this.searchLoaderService.searchBeingUpdated = false;
      }
    );
  }

  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchBookListItems(target.value, false);
    this.searchMagazineListItems(target.value, false);
    this.searchEBookListItems(target.value, false);
  }

  onSearchSubmit(event: any) {
    event.preventDefault();
    const selectElement = event.target.querySelector('#listmode');
    const listMode = selectElement.value;
    const searchTerm = event.target.querySelector('input').value;
    if (listMode === 'books') {
      this.searchBookListItems(searchTerm, true);
    } else if (listMode === 'magazines') {
      this.searchMagazineListItems(searchTerm, true);
    } else if (listMode === 'ebook') {
      this.searchEBookListItems(searchTerm, true);
    }
  }

  isCollapseOpen(collapseId: string): boolean {
    const collapseCheckbox = document.getElementById(
      collapseId
    ) as HTMLInputElement;
    return collapseCheckbox ? collapseCheckbox.checked : false;
  }

  onFeedBackSubmit(event: Event) {
    // append user id, email, phone, firstName, lastName to feedback
    const formData = new FormData();
    const title = this.feedBackForm.get('title')?.value;
    const description = this.feedBackForm.get('description')?.value;
    if (title && description) {
      formData.append('memberid', this.authService.userSubject.value.id);
      formData.append('email', this.authService.userSubject.value.email);
      formData.append(
        'phonenumber',
        this.authService.userSubject.value.phoneNumber
      );
      formData.append(
        'firstName',
        this.authService.userSubject.value.firstName
      );
      formData.append('lastName', this.authService.userSubject.value.lastName);
      formData.append('title', title);
      formData.append('description', description);
      this.feedBackService.sendFeedBack(formData).subscribe({
        next: (response) => {
          this.toasterService.success('Feedback sent successfully');
          this.feedBackForm.reset();
        },
        error: (error) => {
          this.toasterService.error('Failed to send feedback');
        },
      });
    }
  }

  get feedbackTitle(): AbstractControl<string | null> | null {
    return this.feedBackForm.get('title');
  }

  get feedBackDescription(): AbstractControl<string | null> | null {
    return this.feedBackForm.get('description');
  }
}
