import {
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const authService = inject(AuthService);

  if (typeof document !== 'undefined') {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken'))
      ?.split('=')[1];

    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 500) {
        authService.refreshAccesstoken();
      }
      return throwError(() => error);
    })
  );
};
