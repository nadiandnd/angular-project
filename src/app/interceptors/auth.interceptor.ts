import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSecretKey = 'Bearer Token';

  const authToken = localStorage.getItem(authSecretKey);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  //let headers = req.headers.set('Authorization', `Bearer ${authToken}`); clonedReq = req.clone({ headers }); return next.handle(clone Req);
  return next(authReq);
};
