import { BookListResponse } from './HttpResponse/BookListResponse';
import { EBookListResponse } from './HttpResponse/EbookListResponse';
import { MagazineListResponse } from './HttpResponse/MagazineListResponse';

export interface SearchResultCollection {
  bookListItems: BookListResponse[];
  magazineListItems: MagazineListResponse[];
  eBookListItems: EBookListResponse[];
}
