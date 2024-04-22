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

export interface BookListResponse {
  id: string;
  isbnCode: string;
  bookTitle: string;
  bookEdition: number;
  releaseDate: number;
  pageCount: number;
  status: number;
  categoryName: string;
  publisherName: string;
  location: BookLocation;
  authors: BookAuthor[];
}
