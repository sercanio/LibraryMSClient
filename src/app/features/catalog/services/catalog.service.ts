import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BackendService } from '~app/core/services/backend/backend.service';
import { CatalogResponse } from '~app/models/HttpResponse/CatalogResponse';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
 
  constructor(private backendService: BackendService) {}

  getAll(
    pageIndex: number = 0,
    pageSize: number = 10
  ): Observable<Collection<CatalogResponse>> {
    return this.backendService.getAll<CatalogResponse>(
      `Catalogs?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getById(id: string): Observable<CatalogResponse> {
    return this.backendService.get<CatalogResponse>(`Catalogs/${id}`);
  }
}
