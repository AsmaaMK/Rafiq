import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  REFRESH_TOKEN_KEY = 'refresh-token';
  ACCESS_TOKEN_KEY = 'access-token';
  REMEMBER_ME_KEY = 'remember-me';

  rememberMe$ = new BehaviorSubject(this.getRememberMe());

  setRememberMe(rememberMe: boolean): void { 
    this.rememberMe$.next(rememberMe);
    localStorage.setItem(this.REMEMBER_ME_KEY, rememberMe? 'yes': 'no');
  }

  getRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'yes'? true: false;
  }


  setRefreshToken(token: string): void {
    this.rememberMe$.value ?
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token) :
      sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
      || sessionStorage.getItem(this.REFRESH_TOKEN_KEY) || '';
  }

  removeRefreshToken(): void {
    this.rememberMe$.value ?
      localStorage.removeItem(this.REFRESH_TOKEN_KEY) :
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }


  setAccessToken(token: string): void {
    this.rememberMe$.value ?
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token) :
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
      || sessionStorage.getItem(this.ACCESS_TOKEN_KEY) || '';
  }

  removeAccessToken(): void {
    this.rememberMe$.value ?
      localStorage.removeItem(this.ACCESS_TOKEN_KEY) :
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
