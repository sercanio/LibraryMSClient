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

  getAll<T>(resource: string): Observable<Collection<T>> {
    return this.httpClient.get<Collection<T>>(`${this.baseUrl}/${resource}`);
  }

  getSingle<T>(resource: string, id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${resource}/${id}`);
  }
  post<T, U>(resource: string, data: T): Observable<U> {
    return this.httpClient.post<U>(`${this.baseUrl}/${resource}`, data);
  }

  getUserByAuth(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((accessToken) => {
        console.log(accessToken);
        
        if (!accessToken) {
          return of(null);
        }
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.httpClient.get<any>(`${this.baseUrl}/Users/GetFromAuth`, {
          headers,
        });
      })
    );
  }
  
  getAccessToken(): Observable<string | null> {
    return from(
      new Promise<string | null>((resolve) => {
        if (typeof document !== 'undefined') {
          const accessToken =
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('access_token'))
              ?.split('=')[1] || '';
          resolve(accessToken);
        } else {
          resolve(null);
        }
      })
    );
  }
}
