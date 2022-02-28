import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class SetHeadersInterceptorService implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const defaultHeaders: HttpHeaders = req.headers;
    // defaultHeaders.append('Content-Type', 'application/json');
    // console.log(`Req URL: ${req.url}`);
    // if (req.url == 'http://localhost:3000/api/v1/users/user_id/posts/post_id') {
    //   defaultHeaders.append(this.tokenStorage.ACCESS_TOKEN_KEY, this.tokenStorage.getAccessToken());
    // }
    const newReq = req.clone({ 
      headers: req.headers
        .append('Content-Type', 'application/json')
    });
    return next.handle(newReq);
  }
}

// 403: refresh token expired
// 401: access Token expired

export const SetHeadersInterceptorServiceProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SetHeadersInterceptorService,
  multi: true
}