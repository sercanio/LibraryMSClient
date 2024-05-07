import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of, switchMap } from 'rxjs';
import { environment } from '~env/environment';
import { Collection } from '~core/models/Response/Collection';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  get<T>(resource: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${resource}`);
  }

  getAll<T>(resource: string): Observable<Collection<T>> {
    return this.httpClient.get<Collection<T>>(`${this.baseUrl}/${resource}`);
  }

  getSingle<T>(resource: string, id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${resource}/${id}`);
  }

  post<T, U>(resource: string, data: T): Observable<U> {
    return this.httpClient.post<U>(`${this.baseUrl}/${resource}`, data);
  }

  put<T, U>(resource: string, data: T): Observable<U> {
    return this.httpClient.put<U>(`${this.baseUrl}/${resource}`, data);
  }

  delete<T>(resource: string): Observable<T> {
    console.log(`${this.baseUrl}/${resource}`);
    
    return this.httpClient.delete<T>(`${this.baseUrl}/${resource}`);
  }

  postFormData<T, U>(resource: string, formData: FormData): Observable<U> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<U>(`${this.baseUrl}/${resource}`, formData, {
      headers: headers,
    });
  }

  updateAvatar<T, U>(resource: string, data: any): Observable<U> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put<U>(`${this.baseUrl}/${resource}`, data);
  }
}
