import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {

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
  return next(req);
};
