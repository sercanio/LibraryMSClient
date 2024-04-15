import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '~app/models/LoginResponse';
import { LoginRequest } from '~app/models/LoginRequest';
import {
  BehaviorSubject,
  Observable,
  from,
  of,
  switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import { SignupLoaderService } from '../loading/signup-loader/signup-loader.service';
import { HttpErrorService } from '../http-error/http-error.service';
import { LoginLoaderService } from '../loading/login-loader/login-loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject = new BehaviorSubject<any>(null);

  constructor(
    private backendService: BackendService,
    private router: Router,
    private signUpLoaderService: SignupLoaderService,
    private logInLoaderService: LoginLoaderService,
    private httpErrorService: HttpErrorService
  ) {
    this.getUserFromAuth().subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  private revokeToken() {
    return this.backendService.put<any, any>('Auth/RevokeToken', null);
  }

  private storeCookies(token: string) {
    document.cookie = `accessToken=${token}`;
  }

  private deleteCookies() {
    document.cookie =
      'accessToken =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  private async getCookie(name: string): Promise<string> {
    const value = `; ${await document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  public getAccessToken(): Observable<string | null> {
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
    this.logInLoaderService.logInLoading = true;
    this.backendService
      .post<LoginRequest, LoginResponse>('Auth/Login', {
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          this.storeCookies(response.accessToken.token);
          this.httpErrorService.httpError = null;
          this.logInLoaderService.logInLoading = false;
          this.getUserFromAuth().subscribe({
            next: (user) => {
              this.userSubject.next(user);
            },
            error: (error) => {
              console.error('Error', error);
            },
          });
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error('Error', error);
          this.httpErrorService.httpError = error;
          this.logInLoaderService.logInLoading = false;
        },
      });
  }

  public register(formData: any): void {
    this.signUpLoaderService.signupLoading = true;
    this.backendService.post<any, any>('Members', formData).subscribe({
      next: () => {
        this.httpErrorService.httpError = null;
        this.signUpLoaderService.signupLoading = false;
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.httpErrorService.httpError = error;
        this.signUpLoaderService.signupLoading = false;
      },
    });
  }

  public logout(): void {
    this.getAccessToken().subscribe((accessToken) => {
      if (accessToken) {
        this.revokeToken().subscribe(() => {
          console.log('Token revoked successfully');
          this.deleteCookies();
          this.userSubject.next(null);
          this.router.navigateByUrl('/');
        });
      } else {
        console.error('Access token not found');
      }
    });
  }

  public refreshAccesstoken() {
    this.backendService
      .get<any>('Auth/RefreshToken')
      .subscribe((response: any) => {
        if (response) {
          console.log('refreshed token with response' + response.token);
          this.storeCookies(response.token);
          this.refreshUserSubject();
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

  private refreshUserSubject() {
    this.getUserFromAuth().subscribe({
      next: (user) => {
        this.userSubject.next(user);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }

  // TODO: Implement email verification
  public verifyEmail() {
  }
}
