import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

/**
 * FIXME:
 * All commented code from this article https://www.bezkoder.com/angular-12-refresh-token/
 * Try to fix CORS errors 
 */

@Injectable()
export class SetHeadersInterceptorService implements HttpInterceptor {

  // constructor(private tokenService: TokenStorageService, private authService: AuthService) { }
  constructor(private tokenStorage: TokenStorageService, private auth: AuthService) { }

  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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



    /*let authReq = req;
    const token = this.tokenService.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
    */
  }

  /*private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((res: RefreshAccessTokenResponse) => {
            this.isRefreshing = false;
            this.tokenService.setAccessToken(res.results?.accessToken || '');
            this.refreshTokenSubject.next(res.results?.accessToken || '');

            return next.handle(this.addTokenHeader(request, res.results?.accessToken || ''));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logoutUser();
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }*/
  
  /*private addTokenHeader(request: HttpRequest<any>, token: string) {
    
    return request.clone({ headers: request.headers.set(this.tokenService.ACCESS_TOKEN_KEY, token) });
  }*/

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