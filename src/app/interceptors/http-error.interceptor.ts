import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  //return next.handle(request).pipe();
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof ErrorEvent) {
        //client side error
      } else {
        //if(error.status === 400) or 422,423,409,401,500 -> show modal with error messages
      }
      return throwError(() => error);
    })
  );
};
