import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '~app/models/LoginResponse';
import { LoginRequest } from '~app/models/LoginRequest';
import { BehaviorSubject, Observable, from, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject = new BehaviorSubject<any>(null);

  constructor(private backendService: BackendService, private router: Router) {
    this.getUserFromAuth().subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  private storeCookies(response: any) {
    document.cookie = `accessToken=${response.accessToken.token}`;
    document.cookie = `expirationDate=${response.accessToken.expirationDate}`;
  }

  private deleteCookies() {
    document.cookie =
      'accessToken =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refreshToken =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'expirationDate =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  private async getCookie(name: string): Promise<string> {
    const value = `; ${await document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  private getAccessToken(): Observable<string | null> {
    return from(
      new Promise<string | null>(async (resolve) => {
        if (typeof document !== 'undefined') {
          const accessToken = await this.getCookie('accessToken');
          resolve(accessToken);
        } else {
          resolve(null);
        }
      })
    );
  }

  public login(email: string, password: string): void {
    this.backendService
      .post<LoginRequest, LoginResponse>('Auth/Login', {
        email,
        password,
      })
      .subscribe((response: any) => {
        if (response.accessToken) {
          this.storeCookies(response);
          this.getUserFromAuth().subscribe((user) => {
            this.userSubject.next(user);
          });
          this.router.navigateByUrl('/');
        } else {
          console.error('Login failed');
        }
      });
  }

  public logout(): void {
    this.userSubject.next(null);
    this.deleteCookies();
    this.router.navigateByUrl('/');
  }

  public refreshAccesstoken() {
    this.backendService
      .get<any>('Auth/RefreshToken')
      .subscribe((response: any) => {
        if (response) {
          console.log('refreshed token with response' + response);
          document.cookie = `accessToken=${response.token}`;
          document.cookie = `expirationDate=${response.expirationDate}`;
        }
      });
  }

  public getUserFromAuth(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          return of(null);
        }
        return this.backendService.get<any>('Users/GetFromAuth');
      })
    );
  }
}
