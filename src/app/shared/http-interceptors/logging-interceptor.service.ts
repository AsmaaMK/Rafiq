import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // logs the request { url, headers and body } before sending it to the backend
    console.log('Request: ', req.url);
    console.log('Request headers: ', req.headers);
    console.log('Request body: ', req.body);

    return next.handle(req).pipe(
      tap( event => {
        if (event.type === HttpEventType.Response) {
          // console.log('Response headers:', event.headers);
          // logs the response body
          console.log('Response body:', event.body);
        }
      }));
  }
}

export const LoggingInterceptorServiceProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptorService,
  multi: true
}
