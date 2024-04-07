import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '~app/models/LoginResponse';
import { LoginRequest } from '~app/models/LoginRequest';
import { Observable, Subject, from, of, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticated: boolean = false;
  public user: any = null;

  public $refreshToken = new Subject<boolean>();

  constructor(private backendService: BackendService, private router: Router) {
    this.$refreshToken.subscribe(() => {
      this.refreshAccesstoken();
    });
  }

  login(email: string, password: string): void {
    this.backendService
      .post<LoginRequest, LoginResponse>('Auth/Login', {
        email,
        password,
      })
      .subscribe((response: any) => {
        if (response.accessToken) {
          this.authenticated = true;
          document.cookie = `accessToken=${response.accessToken.token}`;
          document.cookie = `expirationDate=${response.accessToken.expirationDate}`;
          this.router.navigateByUrl('/');
        } else {
          console.error('Login failed');
        }
      });
  }

  logout(): void {
    this.authenticated = false;
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  async getCookie(name: string): Promise<string> {
    const value = `; ${await document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  refreshAccesstoken() {
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

  getAccessToken(): Observable<string | null> {
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

  getUserFromAuth(): Observable<any> {
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
