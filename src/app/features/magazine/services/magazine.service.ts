import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BackendService } from '~app/core/services/backend/backend.service';
import { MagazineListResponse } from '~app/models/HttpResponse/MagazineListResponse';
import { MagazineResponse } from '~app/models/HttpResponse/MagazineResponse';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  public favoriteMagazinesSubject = new BehaviorSubject(null);
  constructor(private backendService: BackendService) {}

  getAll(
    pageIndex: number = 0,
    size: number = 10
  ): Observable<Collection<MagazineListResponse>> {
    return this.backendService.getAll<MagazineListResponse>(
      `Magazines?PageIndex=${pageIndex}&PageSize=${size}`
    );
  }

  getById(id: string): Observable<MagazineResponse> {
    return this.backendService.get<MagazineResponse>(`Magazines/${id}`);
  }

  searchMagazines(
    query: string,
    queryParam: string,
    pageIndex: number = 0,
    size: number = 10
  ): Observable<Collection<MagazineListResponse>> {
    return this.backendService.getAll<MagazineListResponse>(
      `Magazines/search?${query}=${queryParam}&PageIndex=${pageIndex}&PageSize=${size}`
    );
  }
}
