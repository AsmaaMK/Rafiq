import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SetHeadersInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // deafult header added to all requests
    const newReq = req.clone({
      headers: req.headers.append('content-type', 'application/json'),
    });

    const authReq = this.addAccessTokenHeader(newReq);

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.warn('401 found!!');

          this.auth.refreshAccessToken();
          return next.handle(this.addAccessTokenHeader(authReq));

        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          console.warn('403 found!!');
          this.auth.logoutUser();
        }
        return throwError(error);
      }));
  }

  private addAccessTokenHeader(request: HttpRequest<any>) {
    const accessToken = this.tokenStorage.getAccessToken();

    if (!request.url.includes('auth') && accessToken)
      return request.clone({
        headers: request.headers.append(this.tokenStorage.ACCESS_TOKEN_KEY, accessToken)
      });

    return request;
  }
}

export const SetHeadersInterceptorServiceProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SetHeadersInterceptorService,
  multi: true
};