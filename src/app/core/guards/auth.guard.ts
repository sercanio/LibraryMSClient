import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserFromAuth().pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};
