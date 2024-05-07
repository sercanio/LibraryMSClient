import { BookStatus, BookStatusEnum } from "../BookStatus";

export interface BookLocation {
  id: string;
  name: string;
  shelfNo: number;
  floorNo: number;
  shelfName: string;
}

export interface BookAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface BookResponse {
  id: string;
  isbnCode: string;
  bookTitle: string;
  bookEdition: number;
  releaseDate: number;
  pageCount: number;
  status: BookStatusEnum;
  categoryName: string;
  publisherName: string;
  location: BookLocation;
  imageUrl : string;
  authors: BookAuthor[];
}
