import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let headers = req.headers;

  if (!headers.has('Content-Type')) {
    headers = headers.set('Content-Type', 'application/json');
  }

  const authToken = authService.getAccessToken();
  if (authToken) {
    headers = headers.set('Authorization', `Bearer ${authToken.trim()}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return authService.refreshAccessToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken}`),
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
