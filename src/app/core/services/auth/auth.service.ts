import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { LoginResponse } from '~app/models/LoginResponse';
import { LoginRequest } from '~app/models/LoginRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticated: boolean = false;
  public user: any = null;
  constructor(private backendService: BackendService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.backendService.post<LoginRequest, LoginResponse>('Auth/Login', {
      email,
      password,
    });
  }

  logout(): void {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUserFromAuth(): any {
    this.user = this.backendService.getUserByAuth();
    return this.user;
  }
}
