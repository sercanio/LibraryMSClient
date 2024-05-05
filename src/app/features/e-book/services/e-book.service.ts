import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BackendService } from '~app/core/services/backend/backend.service';
import { EBookListResponse } from '~app/models/HttpResponse/EbookListResponse';

@Injectable({
  providedIn: 'root',
})
export class EBookService {
  public favoriteBooksSubject = new BehaviorSubject(null);
  constructor(private backendService: BackendService) {}

  getAll(
    pageIndex: number = 0,
    pageSize: number = 10
  ): Observable<Collection<EBookListResponse>> {
    return this.backendService.getAll<EBookListResponse>(
      `EBooks?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getById(id: string): Observable<EBookListResponse> {
    return this.backendService.get<EBookListResponse>(`EBooks/${id}`);
  }

  searchEBooks(
    query: string,
    queryParam: string,
    pageIndex: number = 0,
    size: number = 10
  ): Observable<Collection<EBookListResponse>> {
    return this.backendService.getAll<EBookListResponse>(
      `EBooks/search?${query}=${queryParam}&PageIndex=${pageIndex}&PageSize=${size}`
    );
  }
}
