import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { RefreshAccessTokenResponse } from '../models';

@Injectable()
export class SetHeadersInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // deafult header added to all requests
    const newReq = req.clone({
      headers: req.headers.append('Content-Type', 'application/json')
    });

    return next.handle(newReq);

    /**
     * add auth header to all requests if the access token found in cookies
     * and refresh it if it's expired (401 unothorized error found)
     */
    // const accessToken = this.tokenStorage.getAccessToken();
    // if (!accessToken) {
    //   return next.handle(newReq);
    // } else {
    //   const authReq = this.addAccessTokenHeader(newReq, accessToken);

    //   return next.handle(authReq).pipe(
    //     catchError(error => {
    //       if (error instanceof HttpErrorResponse && error.status === 401) {
    //         console.warn('401 found!!');

    //         return this.handleAccessTokenExpiredError(authReq, next);
    //       }
    //       return throwError(error);
    //     }));
    // }
  }

  // handleAccessTokenExpiredError(request: HttpRequest<any>, next: HttpHandler) {
  //   return this.auth.refreshAccessToken().pipe(
  //     switchMap((res: RefreshAccessTokenResponse) => {

  //       this.tokenStorage.setAccessToken(res.results?.accessToken || '');
  //       this.tokenStorage.setRefreshToken(res.results?.refreshToken || '');

  //       return next.handle(this.addAccessTokenHeader(request, res.results?.accessToken || ''));
  //     }),
  //     catchError((err) => {
  //       return throwError(err);
  //     })
  //   );
  // }

  private addAccessTokenHeader(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      headers: request.headers.append(this.tokenStorage.ACCESS_TOKEN_KEY, accessToken)
    });
  }
}


// 403: refresh token expired

export const SetHeadersInterceptorServiceProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SetHeadersInterceptorService,
  multi: true
};