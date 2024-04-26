import { BookStatusEnum } from "../BookStatus";

export interface BookListLocation {
  id: string;
  name: string;
  shelfNo: number;
  floorNo: number;
  shelfName: string;
}

export interface BookListAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface BookListResponse {
  id: string;
  isbnCode: string;
  bookTitle: string;
  bookEdition: number;
  releaseDate: number;
  pageCount: number;
  status: BookStatusEnum;
  categoryName: string;
  publisherName: string;
  location: BookListLocation;
  authors: BookListAuthor[];
}
