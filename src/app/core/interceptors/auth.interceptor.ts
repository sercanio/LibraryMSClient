import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const authService = inject(AuthService);

  if (typeof document !== 'undefined') {
    req = req.clone({
      withCredentials: true,
    });

    const now = new Date().getTime();

    function getAccessToken() {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken'))
        ?.split('=')[1];
    }

    function getAccessTokenExpirationDate() {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith('expirationDate'))
        ?.split('=')[1];
    }

    let accessToken = getAccessToken();
    let expirationDate = getAccessTokenExpirationDate();

    //   if (accessToken && expirationDate) {
    //     const expirationDateInTime = new Date(expirationDate).getTime();
    //     if (now > expirationDateInTime) {
    //       console.log('AccessToken expired, refreshing...');
    //       authService.refreshAccesstoken();
    //       accessToken = getAccessToken();
    //       expirationDate = getAccessTokenExpirationDate();
    //     } else {
    //       console.log('AccessToken not expired');
    //     }
    //     req = req.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //       withCredentials: true,
    //     });
    //   }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 500) {
        console.log('Unauthorized, refreshing token...');
        authService.refreshAccesstoken();
      }
      return throwError(() => error);
    })
  );
};
