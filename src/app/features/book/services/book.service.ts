import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BackendService } from '~app/core/services/backend/backend.service';
import { BookListResponse } from '~app/models/HttpResponse/BookListResponse';
import { BookResponse } from '~app/models/HttpResponse/BookResspone';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public favoriteBooksSubject = new BehaviorSubject(null);
  public reservedBookSubject = new BehaviorSubject(null);
  constructor(private backendService: BackendService) {}

  getAll(
    pageIndex: number = 0,
    pageSize: number = 10
  ): Observable<Collection<BookListResponse>> {
    return this.backendService.getAll<BookListResponse>(
      `Books?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getById(id: string): Observable<BookResponse> {
    return this.backendService.get<BookResponse>(`Books/${id}`);
  }

  searchBooks(
    query: string,
    queryParam: string,
    pageIndex: number = 0,
    size: number = 10
  ): Observable<Collection<BookListResponse>> {
    return this.backendService.getAll<BookListResponse>(
      `Books/search?${query}=${queryParam}&PageIndex=${pageIndex}&PageSize=${size}`
    );
  }

  reserve(bookId: string, memberId: string): Observable<any> {
    console.log(bookId, memberId);
    return this.backendService.post(`BookReservations`, {
      bookId: bookId,
      memberId: memberId,
      nearestAvailableDate: new Date(),
      requestDate: new Date(),
    });
  }

  unreserve(reservationId: string): Observable<any> {
    return this.backendService.delete(`BookReservations/${reservationId}`);
  }

  favorite(bookId: string, memberId: string): Observable<any> {
    return this.backendService.post(`FavoriteBooks`, {
      bookId: bookId,
      memberId: memberId,
    });
  }

  unfavorite(favoriteId: string): Observable<any> {
    return this.backendService.delete(`FavoriteBooks/${favoriteId}`);
  }
}
