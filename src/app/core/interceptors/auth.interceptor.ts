import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const authService = inject(AuthService);
  let expirationDateCookie: any = null;
  let expirationDate: any;
  if (typeof document !== 'undefined') {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken'))
      ?.split('=')[1];

    expirationDateCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('expirationDate'))
      ?.split('=')[1];

    expirationDate = new Date(expirationDateCookie).getTime();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
    }
    console.log('expirationDate', expirationDate);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 500) {
        // authService.refreshAccesstoken();
      }
      return throwError(() => error);
    })
  );
};
