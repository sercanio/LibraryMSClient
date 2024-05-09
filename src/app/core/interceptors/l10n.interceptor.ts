import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const l10nInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const authService = inject(AuthService);

  if (typeof document !== 'undefined') {
    function getLanguage(): string {
      let language = 'en';
      authService.userSubject.subscribe((user) => {
        if (user) {
          language = user.memberSetting.language;
        }
        language =
          document.querySelector('html')?.getAttribute('lang')?.split('-')[0] ||
          'en';
      });
      return language;
    }

    req = req.clone({
      setHeaders: {
        'Accept-Language': `${getLanguage()}`,
      },
    });
  }

  return next(req);
};
