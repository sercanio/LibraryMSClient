import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { Collection } from '~core/models/Response/Collection';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll<T>(resource: string): Observable<Collection<T>> {
    return this.httpClient
      .get<Collection<T>>(`${this.baseUrl}/${resource}`);
  }

  getSingle<T>(resource: string, id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}/${resource}/${id}`);
  }
}
