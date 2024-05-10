import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '~app/models/HttpResponse/LoginResponse';
import { LoginRequest } from '~app/models/HttpRequest/LoginRequest';
import { BehaviorSubject, Observable, from, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { SignupLoaderService } from '../loading/signup-loader/signup-loader.service';
import { HttpErrorService } from '../http-error/http-error.service';
import { LoginLoaderService } from '../loading/login-loader/login-loader.service';
import { RevokeTokenResponse } from '~app/models/HttpResponse/RevokeTokenResponse';
import { SignupResponse } from '~app/models/HttpResponse/SignupResponse';
import { RefreshTokenResponse } from '~app/models/HttpResponse/RefreshTokenResponse';
import { MemberResponse } from '~app/models/HttpResponse/MemberResponse';
import { UserResponse } from '~app/models/HttpResponse/UserResponse';

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
    this.getMemberFromAuth().subscribe((member) => {
      this.userSubject.next(member);
    });
  }

  private revokeToken(): Observable<RevokeTokenResponse> {
    return this.backendService.put<null, RevokeTokenResponse>(
      'Auth/RevokeToken',
      null
    );
  }

  private storeAccessToken(token: string): void {
    document.cookie = `accessToken=${token}`;
  }

  private deleteAccessToken(): void {
    document.cookie = 'accessToken =; expires = Thu, 01 Jan 1970 00:00:00 UTC;';
  }

  private async getToken(name: string): Promise<string> {
    const value = `; ${await document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  public getAccessToken(): Observable<string | null> {
    return from(
      new Promise<string | null>(async (resolve) => {
        if (typeof document !== 'undefined') {
          const accessToken = await this.getToken('accessToken');
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
          if (response.accessToken) {
            this.storeAccessToken(response.accessToken.token);
            this.httpErrorService.httpError = null;
            this.logInLoaderService.logInLoading = false;
            this.getMemberFromAuth().subscribe({
              next: (member) => {
                this.userSubject.next(member);
                this.userSubject.value;
                window.location.href = `/${member?.memberSetting.language}`;
              },
            });
          }
          if (response.requiredAuthenticatorType) {
            console.log(
              'Authenticator required : ' + response.requiredAuthenticatorType
            );
          }
        },
        error: (error) => {
          console.error('Error', error);
          this.httpErrorService.httpError = error;
          this.logInLoaderService.logInLoading = false;
        },
      });
  }

  public register(formData: FormData): void {
    this.signUpLoaderService.signupLoading = true;
    this.backendService
      .postFormData<FormData, SignupResponse>('Members', formData)
      .subscribe({
        next: () => {
          this.httpErrorService.httpError = null;
          this.signUpLoaderService.signupLoading = false;
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.httpErrorService.httpError = error;
          this.signUpLoaderService.signupLoading = false;
          console.log('Error', error);
        },
      });
  }

  public logout(): void {
    this.getAccessToken().subscribe((accessToken) => {
      if (accessToken) {
        this.revokeToken().subscribe(() => {
          console.log('Token revoked successfully');
          this.deleteAccessToken();
          this.userSubject.next(null);
          this.router.navigateByUrl('/');
        });
      } else {
        console.error('Access token not found');
      }
    });
  }

  public refreshAccesstoken(): void {
    this.backendService
      .get<RefreshTokenResponse>('Auth/RefreshToken')
      .subscribe((response) => {
        this.storeAccessToken(response.token);
        this.refreshuserSubject();
      });
  }

  private getMemberFromAuth(): Observable<MemberResponse | null> {
    return this.getUserFromAuth().pipe(
      switchMap((user) => {
        if (user) {
          return this.backendService.get<MemberResponse>(
            `Members/${user.memberId}`
          );
        }
        return of(null);
      })
    );
  }

  public getUserFromAuth(): Observable<UserResponse | null> {
    return this.getAccessToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          return of(null);
        }
        return this.backendService.get<UserResponse>('Users/GetFromAuth');
      })
    );
  }

  public refreshuserSubject(): void {
    this.getMemberFromAuth().subscribe({
      next: (member) => {
        this.userSubject.next(member);
      },
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.userSubject.pipe(
      switchMap((user) => {
        return of(user !== null);
      })
    );
  }
}
