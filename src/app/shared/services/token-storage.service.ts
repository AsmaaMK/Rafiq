import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  REFRESH_TOKEN_KEY = 'refreshToken';
  ACCESS_TOKEN_KEY = 'accessToken';
  
  rememberMe$ = new BehaviorSubject<boolean>(true);

  constructor( private cookieService: CookieService ) { }

  setRefreshToken(token: string): void {
    this.rememberMe$ ?
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token) :
      sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
      || sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  removeRefreshToken(): void {
    this.rememberMe$ ?
      localStorage.removeItem(this.REFRESH_TOKEN_KEY) :
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    // set cookie with access token and [secure: true]
    this.cookieService.set(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string {
    return this.cookieService.get(this.ACCESS_TOKEN_KEY);
  }

  removeAccessToken(): void {
    this.cookieService.delete(this.ACCESS_TOKEN_KEY);
  }
}
