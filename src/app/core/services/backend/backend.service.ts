import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll<T>(resource: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseUrl}/${resource}`);
  }
}
