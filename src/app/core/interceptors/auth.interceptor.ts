import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: any, next) => {
  const token = req.headers
    .get('Cookie')
    ?.split('; ')
    .find((row: any) => row.startsWith('access_token'))
    ?.split('=')[1];
  req.headers.set('Authorization', `Bearer ${req.token}`);
  return next(req);
};
